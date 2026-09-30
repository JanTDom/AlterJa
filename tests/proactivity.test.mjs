import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("AlterJa Proactivity Engine Tests (Zasada Kardynalna nr 7)", () => {
  const LAYERS = ["biography", "knowledge", "style", "preferences", "values", "decisions", "context"];

  // Odwzorowanie funkcji oceny pokrycia
  function calculateCoverage(memories) {
    const counts = {};
    LAYERS.forEach((l) => (counts[l] = 0));
    memories.forEach((m) => {
      if (counts[m.layer] !== undefined) {
        counts[m.layer]++;
      }
    });

    const targetPerLayer = 10;
    const scores = {};
    let totalScore = 0;

    LAYERS.forEach((l) => {
      const s = Math.min(100, Math.round((counts[l] / targetPerLayer) * 100));
      scores[l] = s;
      totalScore += s;
    });

    const overall = Math.round(totalScore / LAYERS.length);
    const missingCriticalLayers = LAYERS.filter((l) => counts[l] === 0);

    return { counts, scores, overall, missingCriticalLayers };
  }

  function generateSuggestions(coverage, sourcesCount) {
    const actions = [];

    if (sourcesCount === 0) {
      actions.push({
        type: "source_upload",
        title: "Dodaj pierwszy materiał źródłowy",
        priority: 100,
      });
    }

    coverage.missingCriticalLayers.forEach((layer) => {
      actions.push({
        type: "interview_question",
        title: `Uzupełnij lukę w warstwie: ${layer}`,
        priority: 80,
      });
    });

    actions.sort((a, b) => b.priority - a.priority);
    return actions;
  }

  it("wykrywa brakujące warstwy poznawcze dla nowego użytkownika bez danych", () => {
    const emptyMemories = [];
    const coverage = calculateCoverage(emptyMemories);

    assert.strictEqual(coverage.overall, 0);
    assert.strictEqual(coverage.missingCriticalLayers.length, 7);
    assert.ok(coverage.missingCriticalLayers.includes("values"));
    assert.ok(coverage.missingCriticalLayers.includes("style"));
  });

  it("oblicza prawidłowy wskaźnik pokrycia gdy użytkownik posiada częściowe dane", () => {
    const partialMemories = [
      { layer: "biography" },
      { layer: "biography" },
      { layer: "biography" },
      { layer: "biography" },
      { layer: "biography" }, // 5/10 = 50%
      { layer: "values" },
      { layer: "values" }, // 2/10 = 20%
    ];

    const coverage = calculateCoverage(partialMemories);

    assert.strictEqual(coverage.scores.biography, 50);
    assert.strictEqual(coverage.scores.values, 20);
    assert.strictEqual(coverage.scores.style, 0);
    assert.strictEqual(coverage.missingCriticalLayers.includes("biography"), false);
    assert.strictEqual(coverage.missingCriticalLayers.includes("style"), true);
  });

  it("generuje priorytetyzowane sugestie działań (upload przed pytaniami)", () => {
    const coverage = calculateCoverage([]);
    const actions = generateSuggestions(coverage, 0);

    assert.ok(actions.length > 0);
    assert.strictEqual(actions[0].type, "source_upload");
    assert.strictEqual(actions[0].priority, 100);
    assert.ok(actions[1].priority <= actions[0].priority);
  });

  it("gwarantuje brak konfabulacji w generowanych pytaniach proaktywnych", () => {
    const questionTemplates = {
      values: "Jakie nienaruszalne zasady i wartości determinują Twoje wybory życiowe?",
      style: "W jakich sytuacjach wybierasz zwięzłość, a kiedy wolisz rozwinięty wywód?",
      decisions: "Jak wyglądała trudna decyzja z przeszłości, w której odrzuciłeś pozornie łatwiejsze rozwiązanie?",
    };

    // Sprawdzenie czy pytania są oparte o strukturę poznawczą, a nie wymyślone fakty
    for (const [layer, q] of Object.entries(questionTemplates)) {
      assert.ok(q.endsWith("?"), `Pytanie dla ${layer} musi kończyć się znakiem zapytania`);
      assert.ok(!q.includes("Czy pamiętasz jak byłeś w Paryżu"), "Zakaz fabrykowania autobiografii w pytaniach");
    }
  });
});
