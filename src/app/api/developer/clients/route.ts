// ==============================================================================
// AlterJa (alterja.pl) — API Portalu Deweloperskiego (Klucze API i Granty)
// ==============================================================================

import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/server";
import { getLiveApiClients, createLiveApiClient, revokeLiveApiClient } from "@/lib/supabase/db";
import { generateApiKey } from "@/lib/auth/apiKeys";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const clients = await getLiveApiClients(user.id);
    return NextResponse.json({
      success: true,
      clients,
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
    const { name, scopes } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nazwa aplikacji jest wymagana." },
        { status: 400 }
      );
    }

    const { apiKey, keyPrefix, keyHash } = generateApiKey();
    const client = await createLiveApiClient(user.id, name.trim(), keyPrefix, keyHash);

    // Utworzenie grantu uprawnień w access_grants
    const admin = getSupabaseAdmin();
    if (admin) {
      await admin.from("access_grants").insert({
        client_id: client.id,
        user_id: user.id,
        grant_type: Array.isArray(scopes) && scopes.includes("reconstruction") ? "reconstruction" : "memory_query",
        allowed_layers: ["style", "knowledge", "values", "preferences"],
      });
    }

    return NextResponse.json({
      success: true,
      client,
      apiKey, // Klucz zwracany jednorazowo przy utworzeniu
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd tworzenia klucza API";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Wymagany jest identyfikator 'id' klucza API." },
        { status: 400 }
      );
    }

    const success = await revokeLiveApiClient(user.id, id);
    return NextResponse.json({ success, revokedId: id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Błąd unieważnienia klucza";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
