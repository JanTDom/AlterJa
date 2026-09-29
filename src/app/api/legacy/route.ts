// ==============================================================================
// AlterJa (alterja.pl) — API Cyfrowej Spuścizny
// API: GET, POST /api/legacy
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getLiveLegacyDirective, persistLegacyDirective } from "@/lib/supabase/db";
import { DEMO_USER_ID } from "@/lib/db/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") || DEMO_USER_ID;

  const directive = await getLiveLegacyDirective(userId);
  return NextResponse.json({
    success: true,
    directive,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || DEMO_USER_ID;

    const updated = await persistLegacyDirective(userId, body);

    return NextResponse.json({
      success: true,
      directive: updated,
    });
  } catch (error) {
    console.error("[Legacy API POST Error]:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas zapisywania dyspozycji spuścizny." },
      { status: 500 }
    );
  }
}
