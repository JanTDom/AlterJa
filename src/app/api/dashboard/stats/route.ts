// ==============================================================================
// AlterJa (alterja.pl) — API Statystyk Pulpitu Głównego
// API: GET /api/dashboard/stats
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getLiveDashboardStats } from "@/lib/supabase/db";
import { DEMO_USER_ID } from "@/lib/db/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || DEMO_USER_ID;

  const stats = await getLiveDashboardStats(userId);
  return NextResponse.json({
    success: true,
    ...stats,
  });
}
