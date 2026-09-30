// ==============================================================================
// AlterJa (alterja.pl) — API Proaktywności i Kolejki Działań
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { calculateUserCoverage, getSuggestedActionsQueue } from "@/lib/proactivity/engine";
import { createServerSideClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const [coverage, suggestedActions] = await Promise.all([
      calculateUserCoverage(user.id),
      getSuggestedActionsQueue(user.id),
    ]);

    return NextResponse.json({
      success: true,
      coverage,
      suggestedActions,
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
    const { actionId, status } = body;

    if (!actionId || !status) {
      return NextResponse.json(
        { error: "Pola 'actionId' i 'status' są wymagane." },
        { status: 400 }
      );
    }

    const supabase = await createServerSideClient();
    const { error } = await supabase
      .from("suggested_actions")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", actionId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, actionId, status });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd aktualizacji akcji";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
