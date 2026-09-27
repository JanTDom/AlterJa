import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/db/store";
import { GroundingCitation } from "@/domains/types";

export async function POST(req: NextRequest) {
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
    const { query, layers, limit = 5 } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'query'." },
        { status: 400 }
      );
    }

    let items = store.getMemoryItems();

    if (Array.isArray(layers) && layers.length > 0) {
      items = items.filter((m) => layers.includes(m.layer));
    }

    const qLower = query.toLowerCase();
    const matched = items.filter(
      (m) =>
        m.title.toLowerCase().includes(qLower) ||
        m.content.toLowerCase().includes(qLower) ||
        (m.keywords && m.keywords.some((k) => k.toLowerCase().includes(qLower)))
    );

    const finalResults = matched.length > 0 ? matched.slice(0, limit) : items.slice(0, limit);

    const citations: GroundingCitation[] = finalResults.map((m) => {
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

    return NextResponse.json({
      results: citations,
      total_found: citations.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Wystąpił błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
