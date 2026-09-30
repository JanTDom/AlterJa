// ==============================================================================
// AlterJa (alterja.pl) — API Prywatności, Zgód i Prawa do Bycia Zapomnianym (RODO)
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveConsents, setLiveConsent, getLiveAuditEvents, persistAuditEvent } from "@/lib/supabase/db";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { ConsentScope } from "@/domains/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const [consents, auditEvents] = await Promise.all([
      getLiveConsents(user.id),
      getLiveAuditEvents(user.id),
    ]);

    const consentsMap: Record<string, boolean> = {};
    for (const c of consents) {
      consentsMap[c.scope] = c.is_granted;
    }

    return NextResponse.json({
      success: true,
      consents: consentsMap,
      auditEvents,
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
    const { scope, isGranted } = body;

    if (!scope || typeof isGranted !== "boolean") {
      return NextResponse.json(
        { error: "Pola 'scope' i 'isGranted' są wymagane." },
        { status: 400 }
      );
    }

    const consent = await setLiveConsent(user.id, scope as ConsentScope, isGranted);
    await persistAuditEvent(user.id, "consent_updated", { scope, is_granted: isGranted });

    return NextResponse.json({ success: true, consent });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd aktualizacji zgody";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await requireUser();
    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Baza danych niedostępna" }, { status: 503 });
    }

    // 1. Rejestracja audytu przed usunięciem
    await persistAuditEvent(user.id, "account_erasure_requested", { user_id: user.id });

    // 2. Usunięcie profilu (kaskadowo usuwa wszystkie powiązane tabele przez FK ON DELETE CASCADE)
    await admin.from("profiles").delete().eq("id", user.id);

    // 3. Usunięcie konta z auth.users
    await admin.auth.admin.deleteUser(user.id);

    return NextResponse.json({
      success: true,
      message: "Konto oraz wszystkie dane zostały bezpowrotnie usunięte.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd usuwania konta";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
