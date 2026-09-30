"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Mail, KeyRound, ArrowRight, AlertCircle, Loader2, X, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AuthGateModal() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualOpen, setManualOpen] = useState(false);

  const supabase = createClient();
  const isPublicRoute = pathname === "/" || pathname.startsWith("/privacy") || pathname.startsWith("/terms") || pathname.startsWith("/login");

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });

    const handleOpenAuth = () => {
      setManualOpen(true);
      setErrorMessage(null);
    };

    window.addEventListener("alterja-open-auth", handleOpenAuth);
    return () => {
      window.removeEventListener("alterja-open-auth", handleOpenAuth);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMessage(error.message === "Invalid login credentials" ? "Nieprawidłowy e-mail lub hasło." : error.message);
        return;
      }

      setIsAuthenticated(true);
      setManualOpen(false);
      window.dispatchEvent(new CustomEvent("alterja-auth-changed", { detail: { authenticated: true } }));
      window.location.reload();
    } catch {
      setErrorMessage("Błąd połączenia z serwerem autoryzacji.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !inviteCode.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          inviteCode: inviteCode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Błąd rejestracji.");
        return;
      }

      // Po udanej rejestracji logujemy automatycznie
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setMode("login");
        setErrorMessage("Konto utworzone. Zaloguj się.");
        return;
      }

      setIsAuthenticated(true);
      setManualOpen(false);
      window.dispatchEvent(new CustomEvent("alterja-auth-changed", { detail: { authenticated: true } }));
      window.location.reload();
    } catch {
      setErrorMessage("Wystąpił błąd rejestracji.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated === null || isAuthenticated) {
    return null;
  }

  if (isPublicRoute && !manualOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-950 shadow-2xl text-slate-100 flex flex-col">
        {isPublicRoute && (
          <button
            type="button"
            onClick={() => setManualOpen(false)}
            aria-label="Zamknij okno autoryzacji"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="relative h-44 w-full overflow-hidden border-b border-slate-800 flex items-center justify-center">
          <Image
            src="/images/alterja-sphere.jpg"
            alt="Tożsamość AlterJa"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="relative w-44 h-10">
              <Image
                src="/alterja-logo-white.png"
                alt="Logo AlterJa"
                fill
                priority
                className="object-contain filter drop-shadow-[0_4px_24px_rgba(56,189,248,0.4)]"
              />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
              alterja.pl · Logowanie
            </span>
          </div>

          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono tracking-wider text-amber-400 uppercase">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Dostęp kontrolowany</span>
          </div>
        </div>

        <div className="flex border-b border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setMode("login"); setErrorMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === "login"
                ? "text-sky-400 border-b-2 border-sky-400 bg-slate-800/30 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => { setMode("register"); setErrorMessage(null); }}
            className={`flex-1 py-3 text-center transition-colors ${
              mode === "register"
                ? "text-sky-400 border-b-2 border-sky-400 bg-slate-800/30 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Rejestracja z zaproszeniem
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Adres e-mail
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@adres.pl"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Hasło
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs tracking-wide transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Weryfikacja...
                  </>
                ) : (
                  <>
                    <span>Zaloguj się</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <span>Kod zaproszenia</span>
                  <span className="text-amber-400 text-[10px]">Wymagany</span>
                </label>
                <div className="relative flex items-center">
                  <Sparkles className="absolute left-3.5 text-amber-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="np. ALTERJA-FOUNDER-2026"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 text-sm text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Adres e-mail
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@adres.pl"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Ustal hasło
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 znaków"
                    minLength={8}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Weryfikacja zaproszenia...
                  </>
                ) : (
                  <>
                    <span>Aktywuj konto</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Supabase Auth & RLS</span>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Zasady i prywatność
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
