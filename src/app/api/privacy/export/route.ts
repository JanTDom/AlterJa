// ==============================================================================
// AlterJa (alterja.pl) — API Pełnego Eksportu Danych Użytkownika (RODO Art. 20)
// ==============================================================================

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import {
  getLiveProfile,
  getLiveConsents,
  getLiveSources,
  getLiveMemories,
  getLiveDecisions,
  getLiveLegacyDirective,
  persistAuditEvent,
} from "@/lib/supabase/db";
import { createServerSideClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const supabase = await createServerSideClient();

    const [profile, consents, sources, memories, decisions, legacy, hypothesesRes] =
      await Promise.all([
        getLiveProfile(user.id),
        getLiveConsents(user.id),
        getLiveSources(user.id),
        getLiveMemories(user.id),
        getLiveDecisions(user.id),
        getLiveLegacyDirective(user.id),
        supabase.from("hypotheses").select("*").eq("user_id", user.id),
      ]);

    await persistAuditEvent(user.id, "rodo_data_exported", { timestamp: new Date().toISOString() });

    const exportBundle = {
      profile: profile || { id: user.id, email: user.email },
      consents: consents || [],
      sources: sources || [],
      memories: memories || [],
      hypotheses: hypothesesRes.data || [],
      decisions: decisions || [],
      legacy: legacy || { status: "dormant" },
      export_timestamp: new Date().toISOString(),
      format_version: "AlterJa-RODO-1.0",
    };

    return NextResponse.json(exportBundle, {
      headers: {
        "Content-Disposition": `attachment; filename="alterja-export-${user.id}.json"`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
