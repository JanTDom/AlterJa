"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Compass,
  Brain,
  MessageSquare,
  Sparkles,
  FileText,
  SlidersHorizontal,
  Shield,
  Archive,
  Terminal,
  Activity,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Pulpit", icon: Compass },
  { href: "/memory", label: "Pamięć", icon: Brain },
  { href: "/chat", label: "Rozmowa", icon: MessageSquare },
  { href: "/interview", label: "Wywiad", icon: Sparkles },
  { href: "/sources", label: "Źródła", icon: FileText },
  { href: "/style-lab", label: "Styl i decyzje", icon: SlidersHorizontal },
  { href: "/privacy", label: "Prywatność", icon: Shield },
  { href: "/legacy", label: "Spuścizna", icon: Archive },
  { href: "/developer", label: "API", icon: Terminal },
  { href: "/ops", label: "Status", icon: Activity },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLandingPage = pathname === "/";

  const triggerAuthModal = () => {
    window.dispatchEvent(new CustomEvent("alterja-open-auth"));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isLandingPage
          ? "bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 text-white"
          : "glass-header-luxe text-slate-900"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo marki */}
        <Link href="/" className="flex items-center gap-3.5 group py-2">
          <div className="relative h-11 w-36 sm:w-44 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <Image
              src="/alterja-logo.png"
              alt="AlterJa"
              fill
              priority
              className="object-contain object-left filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.2)]"
            />
          </div>
          <span
            className={`hidden xl:inline-block text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border font-semibold shadow-sm ${
              isLandingPage
                ? "border-white/15 bg-white/5 text-slate-300"
                : "border-slate-200/80 bg-white/80 text-slate-500"
            }`}
          >
            alterja.pl
          </span>
        </Link>

        {/* Nawigacja desktopowa */}
        {isLandingPage ? (
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-md text-xs font-mono">
            <a
              href="#metamorfoza"
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Metamorfoza
            </a>
            <a
              href="#zobacz-roznice"
              className="px-3.5 py-1.5 rounded-full text-sky-300 hover:text-sky-200 hover:bg-sky-500/10 transition-colors font-semibold"
            >
              Zobacz różnicę
            </a>
            <a
              href="#zastosowania"
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Zastosowania
            </a>
            <a
              href="#suwerennosc"
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Suwerenność
            </a>
            <div className="h-4 w-px bg-white/15 mx-1" />
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Pulpit
            </Link>
          </nav>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/70 border border-slate-200/60 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm font-semibold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white/80"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-blue-300" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Akcje prawej strony */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={triggerAuthModal}
            className={`text-xs font-mono px-3.5 py-2 rounded-full border transition-all ${
              isLandingPage
                ? "border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Dostęp autoryzowany
          </button>

          <Link
            href="/interview"
            className="btn-luxe-primary !py-2.5 !px-5 text-xs font-medium shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Zbuduj swoje AlterJa</span>
          </Link>
        </div>

        {/* Przycisk mobile menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full border shadow-sm transition-colors ${
              isLandingPage
                ? "text-white bg-slate-900 border-white/20 hover:bg-slate-800"
                : "text-slate-700 bg-white border-slate-200 hover:text-slate-900 hover:bg-slate-50"
            }`}
            aria-label="Przełącz menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200 ${
            isLandingPage
              ? "bg-slate-950/98 border-white/15 text-white"
              : "bg-white/98 border-slate-200 text-slate-900"
          }`}
        >
          {isLandingPage && (
            <div className="flex flex-col space-y-2 border-b border-white/10 pb-3 font-mono text-xs">
              <a
                href="#metamorfoza"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/5"
              >
                01 · Metamorfoza tożsamości
              </a>
              <a
                href="#zobacz-roznice"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/5 text-sky-300 font-semibold"
              >
                02 · Zobacz różnicę w odpowiedzi
              </a>
              <a
                href="#zastosowania"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/5"
              >
                03 · Zastosowania praktyczne
              </a>
              <a
                href="#suwerennosc"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/5"
              >
                04 · Suwerenność i RLS
              </a>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isLandingPage
                      ? isActive
                        ? "bg-sky-500 text-slate-950 font-bold"
                        : "text-slate-300 hover:bg-white/10"
                      : isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                triggerAuthModal();
              }}
              className="w-full py-2.5 px-4 rounded-full text-xs font-mono border border-white/20 bg-white/5 text-slate-200"
            >
              Wprowadź hasło dostępu
            </button>
            <Link
              href="/interview"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-luxe-primary text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zbuduj swoje AlterJa</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
