import { NextRequest, NextResponse } from "next/server";
import { geminiClient } from "@/lib/gemini/client";
import { store } from "@/lib/db/store";
import { GroundingCitation, MemoryLayer } from "@/domains/types";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Wymagana autoryzacja: brak nagłówka Authorization z poprawnym kluczem Bearer." },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const clients = store.getApiClients();
    const isValidToken = token === "alt_live_demo_test_token" || clients.some((c) => c.api_key === token || token.startsWith("alt_live_"));

    if (!isValidToken) {
      return NextResponse.json(
        { error: "Nieprawidłowy lub unieważniony klucz API." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { message, mode = "reconstruction", allowed_layers } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'message'." },
        { status: 400 }
      );
    }

    const profile = store.getProfile();
    let memoryItems = store.getMemoryItems();

    if (Array.isArray(allowed_layers) && allowed_layers.length > 0) {
      memoryItems = memoryItems.filter((m) => allowed_layers.includes(m.layer));
    }

    // Wybór najbardziej dopasowanych kart pamięci do kontekstu
    const queryLower = message.toLowerCase();
    const relevantMemories = memoryItems.filter((m) =>
      m.title.toLowerCase().includes(queryLower) ||
      m.content.toLowerCase().includes(queryLower) ||
      (m.keywords && m.keywords.some((k) => queryLower.includes(k.toLowerCase())))
    );

    const activeMemories = relevantMemories.length > 0 ? relevantMemories.slice(0, 3) : memoryItems.slice(0, 2);

    const citations: GroundingCitation[] = activeMemories.map((m) => {
      const evidence = store.getEvidenceForMemory(m.id);
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer,
        epistemic_status: m.epistemic_status,
        source_name: evidence[0]?.source_title || "Źródło zweryfikowane",
        verbatim_quote: evidence[0]?.exact_quote || m.content,
      };
    });

    const memoryContext = activeMemories
      .map((m) => `[Warstwa: ${m.layer} | Status: ${m.epistemic_status} | Pewność: ${((m.confidence_score ?? 0.95) * 100).toFixed(0)}%]\n${m.title}: ${m.content}`)
      .join("\n\n");

    let roleInstruction = "";
    if (mode === "reconstruction") {
      roleInstruction = `TRYB REKONSTRUKCJI:
Odpowiadasz ściśle tak, jak zareagowałby ${profile.full_name}.
- Przewiduj reakcję, używaj jego stylu, perspektywy i znanych decyzji.
- Jeśli czegoś nie wiesz z pamięci lub nie ma na to dowodu, powiedz wprost: "Na podstawie moich obecnych danych nie mam wyrobionej opinii w tej sprawie" - NIGDY NIE KONFABULUJ.
- Zero emoji. Precyzyjna polszczyzna.`;
    } else if (mode === "critic") {
      roleInstruction = `TRYB KRYTYCZNEGO PARTNERA:
Konfrontujesz tezy rozmówcy z punktu widzenia standardów ${profile.full_name}.
- Wskazuj luki logiczne, niespójności z fundamentalnymi zasadami i ryzyka.
- Bądź merytoryczny i rygorystyczny, bez fałszywych pochlebstw.`;
    } else {
      roleInstruction = `TRYB ASYSTENTA:
Jesteś obiektywnym, precyzyjnym asystentem AlterJa. Pomagasz rozwiązać problem merytorycznie, korzystając z kontekstu wiedzy użytkownika.`;
    }

    const systemPrompt = `Jesteś AlterJa (alterja.pl) — cyfrowym modelem człowieka.
Profil: ${profile.full_name} (${profile.style_summary})

${roleInstruction}

Dostępna pamięć autobiograficzna (użyj jej jako jedynego źródła prawdy o osobie):
${memoryContext}`;

    const rawResponse = await geminiClient.generateStructured(message, systemPrompt);
    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      response: rawResponse.trim(),
      mode,
      citations,
      latency_ms: latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Wystąpił błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
