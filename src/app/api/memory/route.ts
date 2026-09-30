// ==============================================================================
// AlterJa (alterja.pl) — API Pamięci Autobiograficznej
// Wymuszone uwierzytelnienie sesyjne, RLS, automatyczny embedding wektorowy.
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveMemories, persistMemoryItem, deleteLiveMemory } from "@/lib/supabase/db";
import { generateTextEmbedding } from "@/lib/ai/client";
import { MemoryLayer, EpistemicStatus, ConfidenceLevel } from "@/domains/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const layer = searchParams.get("layer") as MemoryLayer | undefined;

    const memories = await getLiveMemories(user.id, layer);
    return NextResponse.json({
      success: true,
      count: memories.length,
      memories,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak autoryzacji sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const {
      layer,
      title,
      content,
      epistemicStatus = "user_declaration",
      confidence = "confirmed",
      exactQuote,
      sourceItemId,
    } = body;

    if (!title || !content || !layer) {
      return NextResponse.json(
        { error: "Pola 'layer', 'title' i 'content' są wymagane." },
        { status: 400 }
      );
    }

    // Obliczenie embeddingu dla nowo dodawanego wspomnienia
    let embedding: number[] | undefined;
    try {
      embedding = await generateTextEmbedding(`${title}\n${content}`);
    } catch {
      // Jeśli model embeddingu nie jest dostępny, zapisujemy rekord bez wektora
    }

    const memory = await persistMemoryItem({
      userId: user.id,
      layer: layer as MemoryLayer,
      title,
      content,
      epistemicStatus: epistemicStatus as EpistemicStatus,
      confidence: confidence as ConfidenceLevel,
      embedding,
      evidence: exactQuote && sourceItemId ? {
        sourceItemId,
        exactQuote,
      } : undefined,
    });

    return NextResponse.json({
      success: true,
      memory,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd zapisu pamięci";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Wymagany jest identyfikator 'id' wspomnienia." },
        { status: 400 }
      );
    }

    const success = await deleteLiveMemory(user.id, id);
    return NextResponse.json({
      success,
      deletedId: id,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd autoryzacji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
