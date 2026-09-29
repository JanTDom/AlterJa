import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Bezpieczny skrót SHA-256 hasła dostępu do aplikacji (nigdy nie eksponowany w kodzie klienta)
const AUTHORIZED_HASH = "aff0d626d1dd85ed88ab023b216429ab75cb3324f47dc393aba2e92294c53cfd";
const SESSION_COOKIE_NAME = "alterja_auth_token";
const SESSION_VALID_SECRET = "alterja_session_authorized_2026";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Wymagane jest podanie hasła dostępu." },
        { status: 400 }
      );
    }

    const inputHash = crypto.createHash("sha256").update(password).digest("hex");

    if (inputHash !== AUTHORIZED_HASH) {
      return NextResponse.json(
        { error: "Nieprawidłowe hasło dostępu. Odmowa autoryzacji." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Autoryzacja pomyślna.",
      authenticated_at: new Date().toISOString(),
    });

    // Ustawienie ciasteczka sesyjnego
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: SESSION_VALID_SECRET,
      httpOnly: false, // Umożliwia weryfikację stanu w hydracji klienta
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dni
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
