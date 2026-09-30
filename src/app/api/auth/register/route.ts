import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { validateInvitationCode, claimInvitationCode } from "@/lib/auth/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, inviteCode } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Wymagane jest podanie poprawnego adresu e-mail i hasła." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Hasło musi zawierać co najmniej 8 znaków." },
        { status: 400 }
      );
    }

    const registrationMode = process.env.ALTERJA_REGISTRATION || "invite";

    // 1. Sprawdzenie kodu zaproszenia w trybie zamkniętej rejestracji
    if (registrationMode === "invite") {
      if (!inviteCode || typeof inviteCode !== "string") {
        return NextResponse.json(
          { error: "Rejestracja jest obecnie zamknięta. Wymagane jest podanie ważnego kodu zaproszenia." },
          { status: 403 }
        );
      }

      const validation = await validateInvitationCode(inviteCode, email);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.reason || "Nieprawidłowy kod zaproszenia." },
          { status: 403 }
        );
      }
    }

    // 2. Utworzenie konta w Supabase Auth
    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Brak skonfigurowanego środowiska bazy danych Supabase." },
        { status: 503 }
      );
    }

    const { data: userData, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        invite_code: inviteCode || null,
      },
    });

    if (createError || !userData.user) {
      return NextResponse.json(
        { error: createError?.message || "Nie udało się utworzyć konta użytkownika." },
        { status: 400 }
      );
    }

    // 3. Oznaczenie zaproszenia jako wykorzystane
    if (inviteCode) {
      await claimInvitationCode(inviteCode, userData.user.id);
    }

    return NextResponse.json({
      success: true,
      message: "Konto zostało pomyślnie utworzone.",
      userId: userData.user.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
