// ==============================================================================
// AlterJa (alterja.pl) — Adapter AI (kompatybilność z Vercel AI SDK)
// Zero atrap i zero zmyślonych odpowiedzi.
// ==============================================================================

import { z } from "zod";
import {
  generateStructuredData,
  streamAiDialogue,
  generateTextEmbedding,
  AI_MODELS,
  ModelUnavailableError,
} from "@/lib/ai/client";

export { AI_MODELS as GEMINI_MODELS, ModelUnavailableError };

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

export interface StructuredGenerationOptions<T> {
  prompt: string;
  systemInstruction?: string;
  schema: z.ZodSchema<T>;
  temperature?: number;
  modelName?: string;
}

export async function generateStructured<T>({
  prompt,
  systemInstruction,
  schema,
  temperature = 0.1,
  modelName,
}: StructuredGenerationOptions<T>): Promise<T> {
  const result = await generateStructuredData({
    prompt,
    systemInstruction,
    schema,
    temperature,
    modelName,
  });
  return result.object;
}

export interface StreamDialogueOptions {
  prompt: string;
  systemInstruction: string;
  history?: { role: "user" | "assistant"; content: string }[];
  onChunk: (chunk: string) => void;
  temperature?: number;
}

export async function streamConversation({
  prompt,
  systemInstruction,
  history = [],
  onChunk,
  temperature = 0.3,
}: StreamDialogueOptions): Promise<string> {
  const messages = [
    ...history.map((h) => ({
      role: h.role,
      content: h.content,
    })),
    {
      role: "user" as const,
      content: prompt,
    },
  ];

  const stream = streamAiDialogue({
    systemInstruction,
    messages,
    temperature,
  });

  let fullResponse = "";
  for await (const chunk of stream.textStream) {
    fullResponse += chunk;
    onChunk(chunk);
  }

  return fullResponse;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  return generateTextEmbedding(text);
}

export const geminiClient = {
  generateStructured: async (prompt: string, systemInstruction?: string): Promise<string> => {
    const res = await generateStructuredData({
      prompt,
      systemInstruction,
      schema: z.object({ response: z.string() }),
    });
    return res.object.response;
  },
  streamConversation,
};
