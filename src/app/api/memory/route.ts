// ==============================================================================
// AlterJa (alterja.pl) — API Pamięci Autobiograficznej
// API: GET, POST, DELETE /api/memory
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getLiveMemories, persistMemoryWithEvidence, deleteLiveMemory } from "@/lib/supabase/db";
import { DEMO_USER_ID } from "@/lib/db/store";
import { MemoryLayer, EpistemicStatus, ConfidenceLevel } from "@/domains/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || DEMO_USER_ID;

  const memories = await getLiveMemories(userId);
  return NextResponse.json({
    success: true,
    count: memories.length,
    memories,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      layer,
      title,
      content,
      epistemicStatus = "user_declaration",
      confidence = "confirmed",
      exactQuote,
      sourceItemId,
      userId = DEMO_USER_ID,
    } = body;

    if (!title || !content || !layer) {
      return NextResponse.json(
        { error: "Pola 'layer', 'title' i 'content' są wymagane." },
        { status: 400 }
      );
    }

    const memory = await persistMemoryWithEvidence({
      userId,
      layer: layer as MemoryLayer,
      title,
      content,
      epistemicStatus: epistemicStatus as EpistemicStatus,
      confidence: confidence as ConfidenceLevel,
      exactQuote,
      sourceItemId,
    });

    return NextResponse.json({
      success: true,
      memory,
    });
  } catch (error) {
    console.error("[Memory API POST Error]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas zapisywania wspomnienia." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = searchParams.get("userId") || DEMO_USER_ID;

  if (!id) {
    return NextResponse.json(
      { error: "Wymagany jest identyfikator 'id' wspomnienia." },
      { status: 400 }
    );
  }

  await deleteLiveMemory(userId, id);
  return NextResponse.json({
    success: true,
    deletedId: id,
  });
}
