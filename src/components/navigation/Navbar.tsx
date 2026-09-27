"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Brain,
  MessageSquare,
  Sparkles,
  Shield,
  FileText,
  Key,
  Archive,
  Menu,
  X,
  Compass,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Pulpit", icon: Compass },
  { href: "/memory", label: "Pamięć", icon: Brain },
  { href: "/chat", label: "Rozmowa", icon: MessageSquare },
  { href: "/interview", label: "Wywiad", icon: Sparkles },
  { href: "/sources", label: "Źródła", icon: FileText },
  { href: "/style-lab", label: "Styl i decyzje", icon: Sparkles },
  { href: "/privacy", label: "Prywatność", icon: Shield },
  { href: "/legacy", label: "Spuścizna", icon: Archive },
  { href: "/developer", label: "API", icon: Key },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = pathname === "/" || pathname?.startsWith("/auth");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-alterja-border/60 bg-alterja-darkest/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative h-9 w-32 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/alterja-logo.png"
              alt="AlterJa logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Nawigacja desktopowa */}
        {!isPublicPage ? (
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Główne menu">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-alterja-blue/15 text-alterja-blue border border-alterja-blue/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#idea"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Idea
            </Link>
            <Link
              href="#memory"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Siedem warstw
            </Link>
            <Link
              href="#demo"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Demonstracja
            </Link>
            <Link
              href="#security"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Bezpieczeństwo
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-alterja-blue to-alterja-purple text-white shadow-lg shadow-alterja-blue/20 hover:opacity-95 transition-opacity"
            >
              Otwórz aplikację
            </Link>
          </nav>
        )}

        {/* Prawy panel - status profilu */}
        {!isPublicPage && (
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Model aktywny</span>
            </div>
          </div>
        )}

        {/* Przycisk mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-alterja-border bg-alterja-dark px-4 pt-2 pb-4 space-y-1">
          {!isPublicPage ? (
            NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-alterja-blue/15 text-alterja-blue border border-alterja-blue/30"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col space-y-3 pt-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-lg bg-alterja-blue text-white font-medium"
              >
                Otwórz aplikację
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

