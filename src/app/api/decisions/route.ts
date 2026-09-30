// ==============================================================================
// AlterJa (alterja.pl) — API Wzorców Decyzyjnych
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveDecisions, persistDecisionCase } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const decisions = await getLiveDecisions(user.id);
    return NextResponse.json({
      success: true,
      count: decisions.length,
      decisions,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json();
    const {
      situation,
      optionsConsidered,
      chosenOption,
      userJustification,
      decisionDate,
    } = body;

    if (!situation || !chosenOption) {
      return NextResponse.json(
        { error: "Pola 'situation' i 'chosenOption' są wymagane." },
        { status: 400 }
      );
    }

    const decision = await persistDecisionCase({
      userId: user.id,
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
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd zapisu decyzji";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
