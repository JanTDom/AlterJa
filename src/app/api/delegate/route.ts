// ==============================================================================
// AlterJa (alterja.pl) — API Centrum Wykonawczego (Delegowanie & Odpisz za mnie)
// API: POST /api/delegate
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { getLiveMemories } from "@/lib/supabase/db";
import { GroundingCitation } from "@/domains/types";

export const dynamic = "force-dynamic";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const {
      taskType = "reply", // "reply" | "audit" | "sparring"
      incomingText,
      intent = "protect_rates", // "protect_rates" | "set_boundary" | "diplomatic" | "block_spam" | "general"
      channel = "email", // "email" | "olx" | "whatsapp" | "sms" | "slack"
      tone = "assertive", // "assertive" | "diplomatic" | "casual"
      senderInfo,
    } = body;

    if (!incomingText || typeof incomingText !== "string" || incomingText.trim().length === 0) {
      return NextResponse.json(
        { error: "Pole 'incomingText' z treścią przychodzącej wiadomości jest wymagane." },
        { status: 400 }
      );
    }

    const profile = globalStore.getProfile(DEMO_USER_ID);
    const memories = await getLiveMemories(DEMO_USER_ID);

    // Wyszukanie kluczowych zasad decyzyjnych i preferencji z bazy
    const queryLower = incomingText.toLowerCase();
    const matchedMemories = memories.filter(
      (m) =>
        m.title.toLowerCase().includes(queryLower) ||
        m.content.toLowerCase().includes(queryLower) ||
        m.layer === "decisions" ||
        m.layer === "values" ||
        m.layer === "style"
    );

    const activeMemories = matchedMemories.length > 0 ? matchedMemories.slice(0, 4) : memories.slice(0, 3);

    const citations: GroundingCitation[] = activeMemories.map((m) => {
      const evidence = m.evidence || globalStore.getEvidenceForMemory(m.id);
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer,
        epistemic_status: m.epistemic_status,
        source_name: evidence[0]?.source_title || "Zasada autobiograficzna",
        verbatim_quote: evidence[0]?.exact_quote || m.content.slice(0, 160),
      };
    });

    const memoryContext = activeMemories
      .map(
        (m) =>
          `[Warstwa: ${m.layer} | Tytuł: ${m.title}]\nTreść zasady: ${m.content}`
      )
      .join("\n\n");

    let systemInstruction = "";

    if (taskType === "audit") {
      systemInstruction = `Jesteś AlterJa — suwerennym doradcą i modelem człowieka dla: ${profile?.display_name || "Właściciela"}.
Twoim zadaniem jest prześwietlenie propozycji/oferty przez pryzmat jego zasad życiowych, stawek i higieny czasu.
Zidentyfikuj czerwone flagi, oceń zgodność z wartościami w skali 0-100% i wydaj jednoznaczny werdykt:
- ODRZUĆ (gdy łamie zasady, zaniża stawki lub narusza czas wolny)
- POSTAW TWARDE WARUNKI (gdy propozycja jest do uratowania przy modyfikacji zakresu)
- ZAAKCEPTUJ (gdy jest w 100% zgodna z celami i stawkami)

Zwróć odpowiedź w formacie JSON z polami:
{
  "verdict": "ODRZUĆ" | "POSTAW TWARDE WARUNKI" | "ZAAKCEPTUJ",
  "matchScore": liczba 0-100,
  "summary": "Krótkie podsumowanie 1-2 zdania",
  "redFlags": ["flaga 1", "flaga 2"],
  "counterProposal": "Gotowa riposta lub kontroferta do wysłania",
  "rationale": "Uzasadnienie odwołujące się do zasad z pamięci"
}
Zero emoji. Sentence casing w języku polskim.`;
    } else {
      systemInstruction = `Jesteś AlterJa (alterja.pl) — cyfrowym modelem człowieka.
Odpisujesz w pierwszej osobie liczby pojedynczej w imieniu: ${profile?.display_name || "użytkownika"}.
Kanał komunikacji: ${channel}.
Wybrany ton: ${tone} (np. twardy/asertywny, kulturalny, krótki).
Intencja: ${intent}.

Zasady:
1. Odpowiadasz bezpośrednio i zwięźle.
2. Jeśli ktoś próbuje zbić stawkę, żąda darmowych poprawek lub marudzi o rabat — odrzuć to kulturalnie, bez tłumaczenia się i bez uległości.
3. Jeśli ktoś zakłóca weekend lub wieczór — wskaż, że to czas regeneracji i odpowiedź nastąpi w godzinach roboczych.
4. Używaj naturalnego, niewymuszonego języka polskiego bez korpomowy i bez zbędnych uprzejmości.
5. Zero dekoracyjnych emoji.

Pamięć i zasady decyzyjne właściciela:
${memoryContext}

Zwróć odpowiedź w formacie JSON z polami:
{
  "replyText": "Dokładna treść wiadomości gotowa do skopiowania i wysłania",
  "ruleApplied": "Nazwa zasady z pamięci, na której się oparłeś",
  "rationale": "Krótkie wyjaśnienie dlaczego tak odpowiedziałeś (1 zdanie)",
  "alternativeTones": {
    "sharper": "Wersja bardziej bezkompromisowa i krótka",
    "softer": "Wersja bardziej dyplomatyczna"
  }
}`;
    }

    let resultJson: any = null;

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction,
          generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        });

        const prompt = `Treść przychodzącej wiadomości / propozycji:\n"""\n${incomingText}\n"""\n${
          senderInfo ? `Nadawca: ${senderInfo}` : ""
        }`;

        const aiResponse = await model.generateContent(prompt);
        const text = aiResponse.response.text();
        resultJson = JSON.parse(text);
      } catch (geminiError) {
        console.warn("[Gemini API Error in /api/delegate, falling back to deterministic engine]:", geminiError);
      }
    }

    // Odpowiedź awaryjna / deterministyczna, jeśli brak klucza lub awaria sieci
    if (!resultJson) {
      if (taskType === "audit") {
        resultJson = {
          verdict: incomingText.includes("rabat") || incomingText.includes("taniej") ? "ODRZUĆ" : "POSTAW TWARDE WARUNKI",
          matchScore: 35,
          summary: "Propozycja niesie ryzyko rozmycia zakresu prac i zaniżenia wyceny Twojego czasu.",
          redFlags: [
            "Presja czasu na natychmiastową decyzję bez prawa do analizy",
            "Oczekiwanie ustępstw bez ekwiwalentnego zmniejszenia wymagań",
            "Brak formalnego zabezpieczenia zaliczkowego",
          ],
          counterProposal:
            "Dziękuję za ofertę. W tym kształcie nie mogę jej zaakceptować. Warunki możemy przedyskutować pod warunkiem zachowania stawki bazowej i zawężenia etapu pierwszego. Do usłyszenia w godzinach pracy.",
          rationale: "Zasada nienaruszalności stawki bazowej oraz ochrony czasu wolnego.",
        };
      } else {
        let reply = "";
        let rule = "Zasada szacunku dla własnego czasu i stawek";
        let rationale = "Odrzucenie żądań sprzecznych z Twoimi kryteriami bez wdawania się w spory.";

        if (intent === "protect_rates" || incomingText.includes("rabat") || incomingText.includes("taniej")) {
          reply = "Dziękuję za wiadomość. Podana cena jest ostateczna i wynika z nakładu pracy oraz jakości, którą gwarantuję. Nie udzielam rabatów ze względu na presję terminu. Jeśli kwota jest dla Państwa za wysoka, możemy proporcjonalnie zmniejszyć zakres zadania. Pozdrawiam.";
          rule = "Zasada nienaruszalności stawek i jakości";
          rationale = "Odrzucenie pracy za półdarmo i obrona Twoich warunków finansowych.";
        } else if (intent === "set_boundary" || incomingText.includes("weekend") || incomingText.includes("niedziela")) {
          reply = "Cześć! Weekend to czas pełnego odpoczynku i nie otwieram wtedy komputera. Jeżeli sprawa wymaga mojej pracy zawodowej, napisz w poniedziałek rano — sprawdzę kalendarz i stawkę za konsultację. Dobrego weekendu!";
          rule = "Zasada ochrony weekendu i higieny odpoczynku";
          rationale = "Wyznaczenie jasnych granic bez poczucia winy.";
        } else if (intent === "block_spam") {
          reply = "Dziękuję, nie wyrażam zgody na kontakt marketingowy. Na podstawie art. 17 i 21 RODO żądam niezwłocznego usunięcia mojego numeru i adresu z Państwa baz telemarketingowych.";
          rule = "Procedura ochrony prywatności RODO";
          rationale = "Natychmiastowe formalne ucięcie kontaktu marketingowego.";
        } else {
          reply = `Dziękuję za kontakt w sprawie: „${incomingText.slice(0, 40)}...”. Zapoznam się ze szczegółami w godzinach roboczych i wrócę z merytoryczną odpowiedzią zgodnie z naszym harmonogramem.`;
        }

        resultJson = {
          replyText: reply,
          ruleApplied: rule,
          rationale,
          alternativeTones: {
            sharper: "Nie wyrażam zgody na te warunki. Temat uważam za zamknięty.",
            softer: "Dziękuję za propozycję, jednak obecnie nie mogę jej przyjąć. W razie zmiany okoliczności wrócimy do tematu.",
          },
        };
      }
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: resultJson,
      citations,
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Błąd serwera";
    console.error("[Delegate API Error]:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
