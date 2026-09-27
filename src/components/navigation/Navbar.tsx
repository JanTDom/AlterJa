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
  ExternalLink,
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
    <header className="sticky top-0 z-50 w-full glass-header">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo marki - Wyraziste i bijące po oczach na jasnym tle */}
        <Link href="/" className="flex items-center gap-3.5 group py-2">
          <div className="relative h-11 sm:h-12 w-36 sm:w-44 transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            <Image
              src="/alterja-logo.png"
              alt="AlterJa"
              fill
              priority
              className="object-contain object-left drop-shadow-sm"
            />
          </div>
          <span className="hidden xl:inline-block text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-600 font-medium">
            alterja.pl
          </span>
        </Link>

        {/* Nawigacja desktopowa */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-300" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Akcje prawej strony */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-alterja-blue hover:bg-blue-700 text-xs font-medium text-white shadow-sm transition-all duration-150 hover:shadow"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Otwórz rozmowę</span>
          </Link>
        </div>

        {/* Przycisk mobile menu */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Przełącz menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 py-4 space-y-1 animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-300" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

export default Navbar;
