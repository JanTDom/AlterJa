"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, KeyRound, ArrowRight, AlertCircle, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrorMessage(error.message === "Invalid login credentials" ? "Nieprawidłowy adres e-mail lub hasło." : error.message);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setErrorMessage("Wystąpił błąd podczas próby logowania.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !inviteCode.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // 1. Walidacja kodu zaproszenia przez API
      const valRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
          inviteCode: inviteCode.trim(),
        }),
      });

      const valData = await valRes.json();

      if (!valRes.ok) {
        setErrorMessage(valData.error || "Nie udało się zrealizować rejestracji.");
        return;
      }

      setSuccessMessage("Konto zostało pomyślnie utworzone. Zaloguj się swoimi danymi.");
      setMode("login");
    } catch {
      setErrorMessage("Wystąpił błąd podczas rejestracji.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 relative overflow-hidden">
      {/* Tło i promienie */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
        {/* Nagłówek wizualny */}
        <div className="relative h-40 w-full overflow-hidden border-b border-slate-800 flex items-center justify-center">
          <Image
            src="/images/alterja-sphere.jpg"
            alt="Tożsamość AlterJa"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/20" />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <Link href="/" className="relative w-40 h-10 block">
              <Image
                src="/alterja-logo-white.png"
                alt="Logo AlterJa"
                fill
                priority
                className="object-contain filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]"
              />
            </Link>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/80">
              alterja.pl · Logowanie
            </span>
          </div>
        </div>

        {/* Zakładki: Logowanie / Rejestracja */}
        <div className="flex border-b border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setMode("login"); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-3.5 text-center transition-colors ${
              mode === "login"
                ? "text-sky-400 border-b-2 border-sky-400 bg-slate-800/30 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Logowanie
          </button>
          <button
            type="button"
            onClick={() => { setMode("register"); setErrorMessage(null); setSuccessMessage(null); }}
            className={`flex-1 py-3.5 text-center transition-colors ${
              mode === "register"
                ? "text-sky-400 border-b-2 border-sky-400 bg-slate-800/30 font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Rejestracja z zaproszeniem
          </button>
        </div>

        {/* Formularz */}
        <div className="p-6 sm:p-8 space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs font-sans">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    Logowanie...
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
                  <span className="text-amber-400 text-[10px]">Wymagany w fazie zamkniętej</span>
                </label>
                <div className="relative flex items-center">
                  <Sparkles className="absolute left-3.5 text-amber-400 w-4 h-4 pointer-events-none" />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="np. ALTERJA-FOUNDER-2026"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-amber-500/40 text-sm text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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

          <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-200 transition-colors">
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

