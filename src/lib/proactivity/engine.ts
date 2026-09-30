// ==============================================================================
// AlterJa (alterja.pl) — Silnik proaktywności (Zasada kardynalna nr 7)
// ==============================================================================

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { MemoryLayer, MemoryItem } from "@/domains/types";

export interface LayerCoverage {
  layer: MemoryLayer;
  name: string;
  count: number;
  score: number; // 0 - 100%
  status: "empty" | "minimal" | "solid" | "rich";
  missingPrompt: string;
}

export interface SuggestedActionItem {
  id: string;
  action_type: "question" | "connect_source" | "confirm_hypothesis" | "resolve_conflict";
  priority: number;
  rationale: string;
  layer: string;
  status: "proposed" | "done" | "dismissed" | "snoozed";
  payload: {
    question?: string;
    source_type?: string;
    hypothesis_id?: string;
    conflict_details?: string;
    [key: string]: unknown;
  };
}

const LAYER_DEFINITIONS: Record<MemoryLayer, { name: string; missingPrompt: string; minIdeal: number }> = {
  biography: {
    name: "Biografia i korzenie",
    missingPrompt: "Dodaj kluczowe fakty z osi czasu, pochodzenia lub etapów kariery.",
    minIdeal: 10,
  },
  knowledge: {
    name: "Wiedza i domena",
    missingPrompt: "Wgraj dokumenty merytoryczne, notatki lub publikacje z Twojej branży.",
    minIdeal: 15,
  },
  style: {
    name: "Styl i ekspresja",
    missingPrompt: "Podłącz próbki autentycznych e-maili lub wiadomości, by model przejął Twój rytm językowy.",
    minIdeal: 12,
  },
  values: {
    name: "Wartości i granice",
    missingPrompt: "Odpowiedz na 3 mikropytania o granice etyczne i nienegocjowalne zasady.",
    minIdeal: 8,
  },
  preferences: {
    name: "Preferencje i nawyki",
    missingPrompt: "Określ swoje ulubione narzędzia, tryb pracy i rytm dnia.",
    minIdeal: 10,
  },
  decisions: {
    name: "Wzorce decyzji",
    missingPrompt: "Zarejestruj 2 trudne wybory z przeszłości wraz z ich uzasadnieniem.",
    minIdeal: 6,
  },
  context: {
    name: "Kontekst i relacje",
    missingPrompt: "Określ kluczowe relacje partnerskie i zawodowe bez ujawniania danych wrażliwych.",
    minIdeal: 8,
  },
};

/**
 * Oblicza stan mapy pokrycia 7 warstw pamięci dla danego użytkownika
 */
export async function calculateUserCoverage(userId: string): Promise<LayerCoverage[]> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return Object.entries(LAYER_DEFINITIONS).map(([layer, def]) => ({
      layer: layer as MemoryLayer,
      name: def.name,
      count: 0,
      score: 0,
      status: "empty",
      missingPrompt: def.missingPrompt,
    }));
  }

  const { data: memories } = await admin
    .from("memory_items")
    .select("layer, confidence, epistemic_status")
    .eq("user_id", userId)
    .eq("is_superseded", false);

  const layerCounts: Record<string, number> = {};
  for (const m of memories || []) {
    layerCounts[m.layer] = (layerCounts[m.layer] || 0) + 1;
  }

  return (Object.keys(LAYER_DEFINITIONS) as MemoryLayer[]).map((layer) => {
    const def = LAYER_DEFINITIONS[layer];
    const count = layerCounts[layer] || 0;
    const score = Math.min(100, Math.round((count / def.minIdeal) * 100));

    let status: "empty" | "minimal" | "solid" | "rich" = "empty";
    if (score >= 80) status = "rich";
    else if (score >= 40) status = "solid";
    else if (score > 0) status = "minimal";

    return {
      layer,
      name: def.name,
      count,
      score,
      status,
      missingPrompt: def.missingPrompt,
    };
  });
}

/**
 * Generuje i pobiera kolejkę działań proaktywnych „Dziś dla Ciebie”
 */
export async function getSuggestedActionsQueue(userId: string): Promise<SuggestedActionItem[]> {
  const admin = getSupabaseAdmin();
  if (!admin) return [];

  // Pobranie zapisanych propozycji ze statusem 'proposed'
  const { data: dbActions } = await admin
    .from("suggested_actions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "proposed")
    .order("priority", { ascending: false })
    .limit(5);

  if (dbActions && dbActions.length >= 3) {
    return dbActions as SuggestedActionItem[];
  }

  // Jeśli w bazie jest mało akcji, silnik wylicza luki i tworzy nowe proaktywne zadania
  const coverage = await calculateUserCoverage(userId);
  const weakestLayers = [...coverage].sort((a, b) => a.score - b.score);

  const newActions: SuggestedActionItem[] = [];

  for (const weak of weakestLayers.slice(0, 3)) {
    if (weak.score < 50) {
      const action: SuggestedActionItem = {
        id: crypto.randomUUID(),
        action_type: weak.count === 0 ? "connect_source" : "question",
        priority: Math.round(100 - weak.score),
        rationale: `Warstwa „${weak.name}” ma zaledwie ${weak.score}% pokrycia. Uzupełnienie jej zwiększy wierność modelu.`,
        layer: weak.layer,
        status: "proposed",
        payload: {
          question: weak.missingPrompt,
          suggested_layer: weak.layer,
        },
      };

      // Zapis w bazie
      await admin.from("suggested_actions").insert({
        id: action.id,
        user_id: userId,
        action_type: action.action_type,
        priority: action.priority,
        rationale: action.rationale,
        layer: action.layer,
        status: "proposed",
        payload: action.payload,
      });

      newActions.push(action);
    }
  }

  return [...(dbActions || []), ...newActions].slice(0, 5) as SuggestedActionItem[];
}
