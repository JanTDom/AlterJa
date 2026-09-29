// ==============================================================================
// AlterJa (alterja.pl) — Stan połączenia z bazą danych Supabase
// API: GET /api/health/db
// ==============================================================================

import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const health = await checkDatabaseHealth();
  return NextResponse.json({
    ...health,
    timestamp: new Date().toISOString(),
  });
}
