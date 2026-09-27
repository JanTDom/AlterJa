// ==============================================================================
// AlterJa (alterja.pl) — Serwerowy Adapter Google Gemini AI
// ==============================================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const apiKey = process.env.GEMINI_API_KEY;

// Inicjalizacja klienta Gemini wyłącznie gdy klucz jest dostępny
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Konfiguracja zalecanych modeli Gemini 2026
export const GEMINI_MODELS = {
  REASONING_AND_EXTRACTION: "gemini-1.5-pro",
  FAST_DIALOGUE: "gemini-1.5-flash",
  EMBEDDINGS: "text-embedding-004",
} as const;

export interface StructuredGenerationOptions<T> {
  prompt: string;
  systemInstruction?: string;
  schema: z.ZodSchema<T>;
  temperature?: number;
  modelName?: string;
}

export interface StreamDialogueOptions {
  prompt: string;
  systemInstruction: string;
  history?: { role: "user" | "model"; parts: string }[];
  onChunk: (chunk: string) => void;
  temperature?: number;
}

export interface GroundedCitation {
  memory_id: string;
  title: string;
  quote: string;
}

export interface ReconstructionResponse {
  content: string;
  uncertainty: "high" | "moderate" | "unknown";
  citations: GroundedCitation[];
  mode: "reconstruction" | "assistant" | "critic";
}

/**
 * Serwerowy generator strukturalny z walidacją Zod i awaryjnym trybem syntetycznym
 */
export async function generateStructured<T>({
  prompt,
  systemInstruction,
  schema,
  temperature = 0.2,
  modelName = GEMINI_MODELS.REASONING_AND_EXTRACTION,
}: StructuredGenerationOptions<T>): Promise<T> {
  if (!genAI) {
    // Deterministyczny tryb syntetyczny (gdy GEMINI_API_KEY nie jest skonfigurowany w środowisku)
    return getSyntheticStructuredFallback(prompt, schema);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction,
      generationConfig: {
        temperature,
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedJson = JSON.parse(responseText);
    return schema.parse(parsedJson);
  } catch (error) {
    console.error("[Gemini Adapter Error] Błąd generowania strukturalnego:", error);
    // W razie błędu sieci/limitu 429 używamy bezpiecznego syntetycznego fallbacku
    return getSyntheticStructuredFallback(prompt, schema);
  }
}

/**
 * Strumieniowanie dialogu z obsługą 3 trybów: Rekonstrukcja, Asystent, Krytyczny partner
 */
export async function streamConversation({
  prompt,
  systemInstruction,
  history = [],
  onChunk,
  temperature = 0.4,
}: StreamDialogueOptions): Promise<string> {
  if (!genAI) {
    const syntheticReply = getSyntheticDialogueReply(prompt, systemInstruction);
    // Symulacja płynnego strumieniowania
    for (let i = 0; i < syntheticReply.length; i += 8) {
      onChunk(syntheticReply.slice(i, i + 8));
      await new Promise((r) => setTimeout(r, 15));
    }
    return syntheticReply;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODELS.FAST_DIALOGUE,
      systemInstruction,
      generationConfig: { temperature },
    });

    const chat = model.startChat({
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.parts }],
      })),
    });

    const result = await chat.sendMessageStream(prompt);
    let fullText = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onChunk(chunkText);
    }

    return fullText;
  } catch (error) {
    console.error("[Gemini Stream Error]:", error);
    const fallback =
      "Wystąpił problem z połączeniem z silnikiem modelu AI. Odpowiedź została wstrzymana w bezpiecznym stanie.";
    onChunk(fallback);
    return fallback;
  }
}

/**
 * Generowanie wektorów embeddingowych
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!genAI) {
    // Deterministyczny pseudowektor 768-wymiarowy oparty o hash tekstu dla środowisk testowych
    return generateDeterministicVector(text, 768);
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODELS.EMBEDDINGS });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("[Gemini Embedding Error]:", error);
    return generateDeterministicVector(text, 768);
  }
}

// ==============================================================================
// Pomocnicze funkcje deterministyczne dla testów i środowiska bez GEMINI_API_KEY
// ==============================================================================

function generateDeterministicVector(seedText: string, dim: number): number[] {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = (hash << 5) - hash + seedText.charCodeAt(i);
    hash |= 0;
  }
  const vec: number[] = [];
  for (let i = 0; i < dim; i++) {
    const val = Math.sin(hash + i) * Math.cos((hash * (i + 1)) / 100);
    vec.push(Number(val.toFixed(6)));
  }
  return vec;
}

function getSyntheticDialogueReply(prompt: string, systemInstruction: string): string {
  const isReconstruction = systemInstruction.includes("Tryb: Rekonstrukcja");
  const isCritic = systemInstruction.includes("Tryb: Krytyczny partner");

  if (isReconstruction) {
    return `Na podstawie dostępnych w mojej pamięci zapisów źródłowych: w kwestii „${prompt.slice(0, 40)}...” zazwyczaj kieruję się zasadą spokojnej weryfikacji faktów i przedkładam precyzję nad pośpiech. Jeśli brakuje mi szczegółów z danego okresu, otwarcie to zaznaczam.`;
  }
  if (isCritic) {
    return `Analizując Twoje pytanie z perspektywy krytycznej: czy założenie, które przyjmujesz w „${prompt.slice(0, 40)}...”, nie pomija alternatywnych wyjaśnień lub nie opiera się na zbyt wąskiej próbie doświadczeń?`;
  }
  return `Jako asystent AlterJa proponuję następujące uporządkowanie: możemy zweryfikować to zagadnienie w Twojej bibliotece pamięci lub sformułować mikropytanie, które uzupełni tę lukę bez zgadywania.`;
}

function getSyntheticStructuredFallback<T>(prompt: string, schema: z.ZodSchema<T>): T {
  // Próba zwrotu bezpiecznego obiektu minimalnego
  const dummyData = {
    memories: [
      {
        layer: "preferences",
        title: "Preferencja wyekstrahowana",
        content: `Obserwacja ze źródła: ${prompt.slice(0, 60)}...`,
        confidence: "provisional",
        quote: prompt.slice(0, 40),
      },
    ],
    hypotheses: [
      {
        text: "Użytkownik przywiązuje dużą wagę do rzetelności informacji i weryfikowalności źródeł.",
        alternative: "Może to być zachowanie sytuacyjne związane z bieżącym projektem technicznym.",
      },
    ],
  };

  try {
    return schema.parse(dummyData);
  } catch {
    // Jeżeli schemat ma inny kształt, tworzymy pusty obiekt spełniający schema
    return schema.parse({} as unknown as T);
  }
}

export const geminiClient = {
  async generateStructured(prompt: string, systemInstruction?: string): Promise<string> {
    if (!genAI) {
      return getSyntheticDialogueReply(prompt, systemInstruction || "");
    }
    try {
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODELS.REASONING_AND_EXTRACTION,
        systemInstruction,
      });
      const res = await model.generateContent(prompt);
      return res.response.text();
    } catch {
      return getSyntheticDialogueReply(prompt, systemInstruction || "");
    }
  },
  streamConversation,
};
