// ==============================================================================
// AlterJa (alterja.pl) — Middleware ochrony tras i odświeżania sesji Supabase
// ==============================================================================

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-alterja.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: Parameters<typeof supabaseResponse.cookies.set>[2];
        }>
      ) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Odświeżenie tokenu sesji Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Trasy jawnie publiczne (dostępne bez logowania)
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/invite") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons");

  // Ochrona stron aplikacji
  if (!isPublicRoute && !user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Brak aktywnej sesji użytkownika. Odmowa dostępu.", code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Bezpieczne nagłówki bezpieczeństwa: CSP, HSTS, X-Frame-Options, X-Content-Type-Options
  supabaseResponse.headers.set("X-Frame-Options", "DENY");
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
  supabaseResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  supabaseResponse.headers.set("Permissions-Policy", "camera=(), microphone=(self), geolocation=()");

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Dopasowanie do wszystkich ścieżek z wyłączeniem statycznych zasobów
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
