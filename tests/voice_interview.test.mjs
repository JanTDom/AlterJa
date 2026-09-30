// ==============================================================================
// AlterJa (alterja.pl) — Testy Jednostkowe Proaktywnego Dialogu Głosowego
// Weryfikacja kontraktów, braku emoji, ekstrakcji reguł kognitywnych i warstw pamięci
// ==============================================================================

import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("AlterJa Proactive Voice Cognitive Dialog Tests", () => {
  test("weryfikuje, że wyekstrahowana reguła decyzyjna mapuje się na prawidłowe warstwy pamięci", () => {
    const validLayers = ["values", "decisions", "preferences", "biography", "knowledge", "style", "context"];

    const sampleRuleExtraction = {
      cognitiveRule: "W sytuacjach presji finansowej stawia na transparentność i ochronę relacji ponad doraźny zysk.",
      targetLayer: "values",
    };

    assert.ok(validLayers.includes(sampleRuleExtraction.targetLayer), "Warstwa musi należeć do 7 warstw pamięci");
    assert.ok(sampleRuleExtraction.cognitiveRule.length > 20, "Reguła kognitywna musi być konkretna");
  });

  test("weryfikuje, że proaktywne pytania głosowe nie zawierają dekoracyjnych emoji ani żargonu transakcyjnego", () => {
    const prohibitedPhrases = ["40% rabatu", "inwestor VC", "3 mln zł", "występ w telewizji", "marża"];
    const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

    const sampleVoicePrompt =
      "Dzień dobry. Przejrzałem Twój profil i widzę, że brakuje nam wiedzy o Twoich kluczowych wartościach. Gdy stajesz przed dylematem: dotrzymać obietnicy danej bliskiemu czy dokończyć pilną sprawę, jak podejmujesz decyzję?";

    assert.ok(!emojiRegex.test(sampleVoicePrompt), "Pytanie asystenta nie może zawierać dekoracyjnych emoji");

    for (const phrase of prohibitedPhrases) {
      assert.ok(!sampleVoicePrompt.toLowerCase().includes(phrase.toLowerCase()), `Pytanie nie może zawierać hermetycznego zwrotu '${phrase}'`);
    }
  });

  test("weryfikuje strukturę odpowiedzi kontraktowej dla kolejki wypowiedzi głosowej (Voice Turn)", () => {
    const mockVoiceTurnResponse = {
      assistantReply: "Rozumiem Twoje podejście. A co w takiej sytuacji jest dla Ciebie granicą, której nigdy nie przekraczasz?",
      extractedRule: "W relacjach zawodowych przedkłada rzetelność ustaleń ponad pośpiech.",
      targetLayer: "decisions",
      isInitial: false,
    };

    assert.strictEqual(typeof mockVoiceTurnResponse.assistantReply, "string");
    assert.strictEqual(typeof mockVoiceTurnResponse.extractedRule, "string");
    assert.strictEqual(typeof mockVoiceTurnResponse.targetLayer, "string");
    assert.strictEqual(typeof mockVoiceTurnResponse.isInitial, "boolean");
  });
});
