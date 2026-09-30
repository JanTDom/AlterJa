import { NextRequest, NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Wymagane jest podanie adresu e-mail oraz hasła." },
        { status: 400 }
      );
    }

    const supabase = await createServerSideClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: "Nieprawidłowy adres e-mail lub hasło dostępu." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Autoryzacja pomyślna.",
      userId: data.user.id,
      email: data.user.email,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Wewnętrzny błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
