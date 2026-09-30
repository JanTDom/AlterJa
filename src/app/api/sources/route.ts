// ==============================================================================
// AlterJa (alterja.pl) — API Listy i Zarządzania Źródłami
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveSources, deleteLiveSource } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const sources = await getLiveSources(user.id);
    return NextResponse.json({
      success: true,
      count: sources.length,
      sources,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Wymagany jest identyfikator 'id' źródła." },
        { status: 400 }
      );
    }

    const success = await deleteLiveSource(user.id, id);
    return NextResponse.json({ success, deletedId: id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Brak sesji";
    return NextResponse.json({ error: msg }, { status: 401 });
  }
}
