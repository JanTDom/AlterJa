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

  return (
    <header className="sticky top-0 z-50 w-full glass-header-luxe transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo marki - Wyraziste, luksusowe na jasnym tle */}
        <Link href="/" className="flex items-center gap-3.5 group py-2">
          <div className="relative h-12 w-40 sm:w-48 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            <Image
              src="/alterja-logo.png"
              alt="AlterJa"
              fill
              priority
              className="object-contain object-left filter drop-shadow-[0_2px_8px_rgba(24,73,169,0.08)]"
            />
          </div>
          <span className="hidden xl:inline-block text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full border border-slate-200/80 bg-white/80 text-slate-500 font-semibold shadow-sm">
            alterja.pl
          </span>
        </Link>

        {/* Nawigacja desktopowa */}
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
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Akcje prawej strony - Przycisk Haute-Couture */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/chat"
            className="btn-luxe-primary !py-2.5 !px-5 text-xs font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
            <span>Otwórz rozmowę</span>
          </Link>
        </div>

        {/* Przycisk mobile menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 shadow-sm transition-colors"
            aria-label="Przełącz menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 text-alterja-blue" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-luxe-primary text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Otwórz rozmowę z modelem</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
