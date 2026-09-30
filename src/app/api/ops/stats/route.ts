// ==============================================================================
// AlterJa (alterja.pl) — API Metryk Operacyjnych (Ops)
// ==============================================================================

import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({
      connected: false,
      sourcesCount: 0,
      memoriesCount: 0,
      auditEventsCount: 0,
      activeJobsCount: 0,
      databaseLatencyMs: 0,
    });
  }

  const start = Date.now();
  const [srcRes, memRes, auditRes, jobsRes] = await Promise.all([
    admin.from("source_items").select("id", { count: "exact", head: true }),
    admin.from("memory_items").select("id", { count: "exact", head: true }),
    admin.from("audit_events").select("id", { count: "exact", head: true }),
    admin.from("ingestion_jobs").select("id", { count: "exact", head: true }).eq("status", "running"),
  ]);
  const latency = Date.now() - start;

  return NextResponse.json({
    connected: true,
    sourcesCount: srcRes.count || 0,
    memoriesCount: memRes.count || 0,
    auditEventsCount: auditRes.count || 0,
    activeJobsCount: jobsRes.count || 0,
    databaseLatencyMs: latency,
  });
}
