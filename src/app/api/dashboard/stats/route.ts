// ==============================================================================
// AlterJa (alterja.pl) — API Statystyk Pulpitu Głównego
// ==============================================================================

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveDashboardStats } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const stats = await getLiveDashboardStats(user.id);
    return NextResponse.json({
      success: true,
      ...stats,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
