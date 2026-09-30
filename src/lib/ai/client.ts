// ==============================================================================
// AlterJa (alterja.pl) — Ujednolicony adapter Vercel AI SDK (Google Gemini / Anthropic)
// Zero atrap syntetycznych. Jawny błąd w razie niedostępności dostawcy.
// ==============================================================================

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject as aiGenerateObject, streamText as aiStreamText, embed as aiEmbed, type ModelMessage } from "ai";
import { z } from "zod";

export class ModelUnavailableError extends Error {
  public readonly statusCode = 503;
  constructor(message = "Silnik modeli AI jest obecnie niedostępny lub brak skonfigurowanego klucza API w środowisku.") {
    super(message);
    this.name = "ModelUnavailableError";
  }
}

// Konfiguracja modeli aktualnych na rok 2026
export const AI_MODELS = {
  // Rozumowanie pogłębione, kompilacja persony, rekonstrukcja i zaawansowana ekstrakcja
  REASONING: process.env.AI_REASONING_MODEL || "gemini-2.5-pro",
  // Szybki dialog asystenta, generowanie pytań pochodnych, mikrowywiady
  FAST: process.env.AI_FAST_MODEL || "gemini-2.5-flash",
  // Multimodalny odbiór audio, skanów, obrazów
  MULTIMODAL: process.env.AI_MULTIMODAL_MODEL || "gemini-2.5-flash",
  // Generowanie wektorów semantycznych (768 wymiarów)
  EMBEDDINGS: process.env.AI_EMBEDDING_MODEL || "text-embedding-004",
} as const;

export function getGoogleProvider() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "placeholder-key-for-local-development") {
    throw new ModelUnavailableError("Klucz GEMINI_API_KEY nie został skonfigurowany w środowisku produkcyjnym.");
  }
  return createGoogleGenerativeAI({ apiKey });
}

export interface StructuredGenerationParams<T> {
  prompt: string;
  systemInstruction?: string;
  schema: z.ZodSchema<T>;
  temperature?: number;
  modelName?: string;
}

/**
 * Wyjścia strukturalne przez schematy Zod (generateObject z Vercel AI SDK)
 * Zero syntetycznych atrap — brak modelu to błąd.
 */
export async function generateStructuredData<T>({
  prompt,
  systemInstruction,
  schema,
  temperature = 0.1,
  modelName = AI_MODELS.REASONING,
}: StructuredGenerationParams<T>): Promise<{ object: T; usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number } }> {
  const google = getGoogleProvider();

  const result = await aiGenerateObject({
    model: google(modelName),
    system: systemInstruction,
    prompt,
    schema,
    temperature,
  });

  return {
    object: result.object,
    usage: result.usage,
  };
}

export interface StreamDialogueParams {
  systemInstruction: string;
  messages: ModelMessage[];
  temperature?: number;
  modelName?: string;
}

/**
 * Prawdziwe strumieniowanie dialogu przez streamText z Vercel AI SDK
 */
export function streamAiDialogue({
  systemInstruction,
  messages,
  temperature = 0.3,
  modelName = AI_MODELS.FAST,
}: StreamDialogueParams) {
  const google = getGoogleProvider();

  return aiStreamText({
    model: google(modelName),
    system: systemInstruction,
    messages,
    temperature,
  });
}

/**
 * Prawdziwe generowanie embeddingów bez pseudowektorów
 */
export async function generateTextEmbedding(text: string): Promise<number[]> {
  const google = getGoogleProvider();
  const embeddingModel = google.textEmbeddingModel(AI_MODELS.EMBEDDINGS);

  const { embedding } = await aiEmbed({
    model: embeddingModel,
    value: text.trim(),
  });

  return embedding;
}
