// ==============================================================================
// AlterJa (alterja.pl) — Bezpieczeństwo i uwierzytelnianie sesyjne
// ==============================================================================

import { createServerSideClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { User } from "@supabase/supabase-js";

export class UnauthorizedError extends Error {
  public readonly statusCode = 401;
  constructor(message = "Brak aktywnej sesji użytkownika. Wymagane zalogowanie.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Zwraca aktualnie zalogowanego użytkownika lub null.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createServerSideClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

/**
 * Wymaga zalogowanego użytkownika w Route Handlerze API.
 * W razie braku sesji rzuca UnauthorizedError lub pozwala zwrócić kod 401.
 */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError();
  }
  return user;
}

/**
 * Pomocnik dla Route Handlers: bezpieczne wykonanie z automatyczną obsługą 401
 */
export async function withAuthenticatedUser(
  handler: (user: User) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const user = await requireUser();
    return await handler(user);
  } catch (err: unknown) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: "Brak autoryzacji sesji.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }
    const message = err instanceof Error ? err.message : "Wewnętrzny błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Weryfikacja kodu zaproszenia w procesie zamkniętej rejestracji
 */
export async function validateInvitationCode(code: string, email?: string): Promise<{ valid: boolean; reason?: string; invitationId?: string }> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    // Jeśli baza nie jest jeszcze podłączona w środowisku testowym
    if (code === "ALTERJA-FOUNDER-2026") {
      return { valid: true };
    }
    return { valid: false, reason: "Brak połączenia z bazą weryfikacji zaproszeń." };
  }

  const { data, error } = await admin
    .from("invitations")
    .select("id, code, email, is_active, expires_at, used_at")
    .eq("code", code.trim().toUpperCase())
    .single();

  if (error || !data) {
    return { valid: false, reason: "Nieprawidłowy kod zaproszenia." };
  }

  if (!data.is_active || data.used_at) {
    return { valid: false, reason: "Ten kod zaproszenia został już wykorzystany." };
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, reason: "Ten kod zaproszenia utracił ważność." };
  }

  if (data.email && email && data.email.toLowerCase() !== email.toLowerCase()) {
    return { valid: false, reason: "Ten kod zaproszenia jest przypisany do innego adresu e-mail." };
  }

  return { valid: true, invitationId: data.id };
}

/**
 * Oznaczenie zaproszenia jako wykorzystane po utworzeniu konta
 */
export async function claimInvitationCode(code: string, userId: string): Promise<boolean> {
  const admin = getSupabaseAdmin();
  if (!admin) return true;

  const { error } = await admin
    .from("invitations")
    .update({
      used_by: userId,
      used_at: new Date().toISOString(),
      is_active: false,
    })
    .eq("code", code.trim().toUpperCase());

  return !error;
}
