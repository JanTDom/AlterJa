import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "alterja_auth_token";
const SESSION_VALID_SECRET = "alterja_session_authorized_2026";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const isAuthenticated = token === SESSION_VALID_SECRET;

  return NextResponse.json({
    authenticated: isAuthenticated,
  });
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Wylogowano pomyślnie.",
  });

  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
