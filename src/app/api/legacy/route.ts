// ==============================================================================
// AlterJa (alterja.pl) — API Cyfrowej Spuścizny
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveLegacyDirective, persistLegacyDirective } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const directive = await getLiveLegacyDirective(user.id);
    return NextResponse.json({
      success: true,
      directive,
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

    const updated = await persistLegacyDirective(user.id, body);

    return NextResponse.json({
      success: true,
      directive: updated,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Wewnętrzny błąd zapisu";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
