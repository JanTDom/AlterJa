import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/server";
import { createServerSideClient } from "@/lib/supabase/server";

export async function GET() {
  const user = await getCurrentUser();

  return NextResponse.json({
    authenticated: !!user,
    userId: user?.id || null,
    email: user?.email || null,
  });
}

export async function DELETE() {
  try {
    const supabase = await createServerSideClient();
    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
      message: "Wylogowano pomyślnie.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Błąd wylogowania";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
