// ==============================================================================
// AlterJa (alterja.pl) — API Wzorców Decyzyjnych
// API: GET, POST /api/decisions
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getLiveDecisions, persistDecisionCase } from "@/lib/supabase/db";
import { DEMO_USER_ID } from "@/lib/db/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || DEMO_USER_ID;

  const decisions = await getLiveDecisions(userId);
  return NextResponse.json({
    success: true,
    count: decisions.length,
    decisions,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      situation,
      optionsConsidered,
      chosenOption,
      userJustification,
      decisionDate,
      userId = DEMO_USER_ID,
    } = body;

    if (!situation || !chosenOption) {
      return NextResponse.json(
        { error: "Pola 'situation' i 'chosenOption' są wymagane." },
        { status: 400 }
      );
    }

    const decision = await persistDecisionCase({
      userId,
      situation,
      optionsConsidered: Array.isArray(optionsConsidered) ? optionsConsidered : [chosenOption],
      chosenOption,
      userJustification,
      decisionDate,
    });

    return NextResponse.json({
      success: true,
      decision,
    });
  } catch (error) {
    console.error("[Decisions API POST Error]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas zapisywania decyzji." },
      { status: 500 }
    );
  }
}
