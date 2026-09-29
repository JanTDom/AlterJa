"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

export default function AuthGateModal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Sprawdzenie sesji po załadowaniu
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setErrorMessage(data.error || "Nieprawidłowe hasło dostępu.");
      }
    } catch {
      setErrorMessage("Błąd połączenia z serwerem autoryzacji.");
    } finally {
      setIsLoading(false);
    }
  };

  // Dopóki trwa sprawdzanie sesji, nie wyświetlamy nic lub subtelny blur
  if (isAuthenticated === null) {
    return null;
  }

  // Jeśli użytkownik jest już uwierzytelniony, modal nie jest renderowany
  if (isAuthenticated) {
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
        {/* Górna scena artystyczna z oficjalnym logo AlterJa */}
        <div className="relative h-48 w-full overflow-hidden border-b border-slate-800 flex items-center justify-center">
          <Image
            src="/images/alterja-sphere.jpg"
            alt="Szklana sfera lewitująca nad wodą reprezentująca jądro tożsamości AlterJa"
            fill
            priority
            className="object-cover object-center filter brightness-[0.55] contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

          {/* Oficjalne Logo AlterJa w centrum nagłówka */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="relative w-48 h-12">
              <Image
                src="/alterja-logo.png"
                alt="Logo AlterJa"
                fill
                priority
                className="object-contain filter drop-shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
              />
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 px-3 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
              alterja.pl · Autoryzowany dostęp
            </span>
          </div>

          {/* Oznaczenie statusu bramki */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono tracking-wider text-alterja-gold uppercase">
            <Lock className="w-3 h-3 text-alterja-gold" />
            <span>Bramka tożsamości</span>
          </div>
        </div>

        {/* Zawartość formularza */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h2 id="auth-modal-title" className="text-2xl font-serif font-medium text-white tracking-tight">
              Dostęp do cyfrowego modelu
            </h2>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Projekt AlterJa chroni autobiografię, styl i cyfrową spuściznę. Wprowadź autoryzowane hasło, aby odblokować pełny dostęp do modułów aplikacji.
            </p>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs font-sans animate-in shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="auth-password" className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Hasło dostępu</span>
                <span className="text-slate-500 font-normal">Autoryzacja lokalna</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Wprowadź hasło..."
                  autoFocus
                  required
                  className="w-full pl-10 pr-12 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-alterja-blue focus:border-transparent font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1.5 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-alterja-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium text-xs tracking-wide transition-all shadow-lg shadow-blue-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Weryfikacja uprawnień...
                </>
              ) : (
                <>
                  <span>Odblokuj aplikację</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Szyfrowana weryfikacja SHA-256
            </span>
            <span>AlterJa v1.0 • 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
