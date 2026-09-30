// ==============================================================================
// AlterJa (alterja.pl) — API Proaktywnego Dialogu Głosowego (Voice Turn)
// Asystent proaktywnie inicjuje i prowadzi wywiad głosowy, analizując tok myślenia
// i system decyzyjny użytkownika oraz utrwalając zidentyfikowane reguły w pamięci.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { persistMemoryItem, getLiveMemories } from "@/lib/supabase/db";
import { getGoogleProvider, AI_MODELS, generateTextEmbedding } from "@/lib/ai/client";
import { generateText } from "ai";
import { MemoryLayer } from "@/domains/types";

interface DialogMessage {
  role: "assistant" | "user";
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const dialogHistory: DialogMessage[] = Array.isArray(body.dialogHistory) ? body.dialogHistory : [];
    const userSpeechText: string = typeof body.userSpeechText === "string" ? body.userSpeechText.trim() : "";
    const activeLayer: string = typeof body.activeLayer === "string" ? body.activeLayer : "";

    const google = getGoogleProvider();

    // --------------------------------------------------------------------------
    // SCENARIUSZ A: Użytkownik odpowiedział głosem — analiza toku myślenia + follow-up
    // --------------------------------------------------------------------------
    if (userSpeechText) {
      const lastAssistantQuestion =
        [...dialogHistory].reverse().find((m) => m.role === "assistant")?.text || "Dylemat życiowy i kryteria decyzyjne";

      const promptAnalysis = `
Jesteś kognitywnym analitykiem tożsamości w AlterJa (alterja.pl).
Użytkownik właśnie odpowiedział głosem na pytanie asystenta w wywiadzie autobiograficznym.

Pytanie asystenta: „${lastAssistantQuestion}”
Odpowiedź głosowa użytkownika: „${userSpeechText}”
Poprzedni kontekst rozmowy (ostatnie wypowiedzi):
${dialogHistory.slice(-4).map((m) => `${m.role === "assistant" ? "Asystent" : "Użytkownik"}: ${m.text}`).join("\n")}

Twoje zadanie:
1. Zidentyfikuj nadrzędną ZASADĘ MYŚLENIA / DZIAŁANIA użytkownika (np. »W sytuacjach nacisku relacyjnego stawia ochronę zaufania ponad doraźną korzyść materialną...«).
2. Wybierz odpowiednią warstwę pamięci z listy: values, decisions, preferences, biography, knowledge, style, context.
3. Przygotuj kolejną wypowiedź asystenta w dialogu głosowym:
   - W pierwszym zdaniu krótko i po ludzku odnieś się do tego, co użytkownik powiedział (pokaż, że naprawdę usłyszałeś jego motywację, bez pochlebstw i bez banałów).
   - W drugim zdaniu zadaj kolejne wnikliwe, proaktywne pytanie pogłębiające ten dylemat lub badające sytuację graniczną (np. »A jak reagujesz, gdy druga strona próbuje wymusić ustępstwo poczuciem winy?«).
   - Mów naturalnym, spokojnym, eleganckim językiem polskim dostosowanym do syntezy mowy. Zero emoji, zero korporacyjnego żargonu.

Zwróć odpowiedź w formacie JSON (bez bloków markdown, czysty JSON):
{
  "cognitiveRule": "jedno zwięzłe zdanie z wyekstrahowaną zasadą decyzyjną",
  "targetLayer": "values | decisions | preferences | boundaries | relationships",
  "assistantVoiceReply": "1-2 zdania wypowiedzi asystenta do przeczytania głosem"
}
`;

      const aiRes = await generateText({
        model: google(AI_MODELS.FAST),
        prompt: promptAnalysis,
      });

      let parsed: { cognitiveRule?: string; targetLayer?: string; assistantVoiceReply?: string } = {};
      try {
        const cleaned = aiRes.text.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = {
          cognitiveRule: `W odpowiedzi na „${lastAssistantQuestion.slice(0, 50)}” użytkownik kieruje się: ${userSpeechText.slice(0, 100)}`,
          targetLayer: "decisions",
          assistantVoiceReply: `Rozumiem Twój punkt widzenia. A co w takiej sytuacji jest dla Ciebie granicą, której nigdy nie przekraczasz?`,
        };
      }

      const cognitiveRule = parsed.cognitiveRule || "Zidentyfikowano wzorzec decyzyjny użytkownika.";
      const targetLayer = (parsed.targetLayer as MemoryLayer) || (activeLayer as MemoryLayer) || "decisions";
      const assistantVoiceReply =
        parsed.assistantVoiceReply || "Rozumiem Twoje podejście. Opowiedz mi, jak wpływa to na Twoje codzienne wybory?";

      // Zapis w pamięci autobiograficznej z wektoryzacją
      let embedding: number[] | undefined;
      try {
        embedding = await generateTextEmbedding(`${cognitiveRule}\n${userSpeechText}`);
      } catch {
        // Kontynuacja bez wektora w razie niedostępności modelu embeddingów
      }

      const memoryItem = await persistMemoryItem({
        userId: user.id,
        layer: targetLayer,
        title: `Zasada: ${cognitiveRule.slice(0, 70)}`,
        content: `Wyekstrahowana zasada myślenia i działania: ${cognitiveRule}\n\nKontekst pytania głosem: „${lastAssistantQuestion}”\nDosłowna odpowiedź użytkownika: „${userSpeechText}”`,
        epistemicStatus: "user_declaration",
        confidence: "confirmed",
        embedding,
      });

      return NextResponse.json({
        assistantReply: assistantVoiceReply,
        extractedRule: cognitiveRule,
        targetLayer,
        memoryItemId: memoryItem.id,
        isInitial: false,
      });
    }

    // --------------------------------------------------------------------------
    // SCENARIUSZ B: Start sesji — proaktywna analiza luk w pamięci i inicjacja głosem
    // --------------------------------------------------------------------------
    const existingMemories = await getLiveMemories(user.id);
    const layerCounts: Record<string, number> = {};
    for (const m of existingMemories) {
      layerCounts[m.layer] = (layerCounts[m.layer] || 0) + 1;
    }

    const layersToProbe: MemoryLayer[] = ["values", "decisions", "preferences", "biography", "knowledge", "style", "context"];
    const leastCoveredLayer = layersToProbe.sort((a, b) => (layerCounts[a] || 0) - (layerCounts[b] || 0))[0] || "values";

    const promptInit = `
Jesteś proaktywnym partnerem poznawczym w AlterJa (alterja.pl).
Użytkownik właśnie wszedł do Studia Rozmowy Głosowej.
Program przejmuje inicjatywę — nie czeka, aż użytkownik coś napisze, lecz sam rozpoczyna rozmowę głosem.

Stan profilu użytkownika:
- Zbadana liczba wspomnień: ${existingMemories.length}
- Najmniej zbadana warstwa: ${leastCoveredLayer}

Twoje zadanie:
Sformułuj pierwsze, proaktywne powitanie i pytanie wyjściowe do przeczytania głosem (maksymalnie 2-3 zwięzłe zdania):
1. Krótkie powitanie i uzasadnienie proaktywne (np. »Dzień dobry. Przejrzałem Twój profil tożsamości i widzę, że brakuje nam wiedzy o Twoich kluczowych wartościach i granicach...«).
2. Konkretny, ludzki dylemat sytuacyjny badający tę warstwę (np. dylemat etyczny, dylemat relacyjny, dylemat presji czasu lub obrony odpoczynku).
Pytanie musi być uniwersalne i dotyczyć prawdziwego życia (nie hermetyczny korporacyjny żargon o rabatach czy inwestorach, lecz uniwersalna etyka i granice).
Czysta polszczyzna, zero emoji.

Zwróć odpowiedź w formacie JSON:
{
  "assistantVoiceReply": "tekst powitania i pierwszego pytania do przeczytania na głos",
  "targetLayer": "${leastCoveredLayer}"
}
`;

    const aiRes = await generateText({
      model: google(AI_MODELS.FAST),
      prompt: promptInit,
    });

    let parsedInit: { assistantVoiceReply?: string; targetLayer?: string } = {};
    try {
      const cleaned = aiRes.text.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedInit = JSON.parse(cleaned);
    } catch {
      parsedInit = {
        assistantVoiceReply:
          "Dzień dobry. Przejrzałem Twój profil i chcę zbadać Twoje kluczowe reguły decyzyjne. Gdy stajesz przed wyborem: dotrzymać obietnicy danej bliskiej osobie czy dokończyć pilną sprawę z zewnątrz, jak podejmujesz decyzję?",
        targetLayer: leastCoveredLayer,
      };
    }

    return NextResponse.json({
      assistantReply: parsedInit.assistantVoiceReply || "Dzień dobry. Opowiedz mi, jaka nadrzędna zasada kieruje Twoimi najważniejszymi wyborami?",
      extractedRule: null,
      targetLayer: parsedInit.targetLayer || leastCoveredLayer,
      isInitial: true,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd sesji głosowej";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
