"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldCheck, Database, Layers, Sparkles, Activity } from "lucide-react";

export default function HeroSculpture() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:max-w-none aspect-[4/5] sm:aspect-square rounded-[2.5rem] p-3 sm:p-5 transition-transform duration-500 ease-out select-none group"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Dynamiczna poświata krawędziowa śledząca kursor */}
      <div
        className="absolute -inset-2 rounded-[3rem] opacity-40 blur-2xl transition-opacity duration-700 pointer-events-none group-hover:opacity-75"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 60}% ${
            50 + mousePos.y * 60
          }%, rgba(56, 189, 248, 0.35), rgba(99, 102, 241, 0.15) 50%, transparent 80%)`,
        }}
      />

      {/* Główna rzeźba 2.5D z fizycznym nachyleniem */}
      <div
        className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/20 bg-slate-950/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion
            ? "none"
            : `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) translateZ(10px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Tło fotograficzne rdzenia tożsamości */}
        <Image
          src="/images/alterja-sphere.jpg"
          alt="Szklana sfera rdzenia tożsamości lewitująca nad lustrem wody"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center scale-105 transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.92] contrast-[1.08]"
        />

        {/* Wieloplanowe maski kinowe */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Animowany promień skanowania telemetrycznego */}
        <div
          className="absolute inset-x-0 h-32 pointer-events-none opacity-60"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.22), rgba(255, 255, 255, 0.4), transparent)",
            animation: reducedMotion ? "none" : "scanline 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />

        {/* Wskaźnik górny: Architektura kognitywna */}
        <div
          className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-20"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-xs font-mono text-slate-200 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase text-[10px]">Model aktywny</span>
            <span className="text-slate-500">·</span>
            <span className="text-sky-300 text-[10px]">7 warstw kognitywnych</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/20 text-[10px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Izolacja RLS</span>
          </div>
        </div>

        {/* Lewitująca karta telemetrii w centrum rzeźby */}
        <div
          className="absolute bottom-6 left-5 right-5 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-2xl border border-white/20 shadow-2xl text-white space-y-3 z-20"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
                Stan rekonstrukcji osoby
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
              100% uziemienie
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center font-mono">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Warstwy</span>
              <span className="text-sm sm:text-base font-bold text-white">7 / 7</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Halucynacja</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">0.00%</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Dyskrecja</span>
              <span className="text-sm sm:text-base font-bold text-sky-300">Prywatna</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-1">
            „Odpowiadam na podstawie Twoich wywiadów i autentycznych notatek. Przy braku wiedzy — odmawiam spekulacji.”
          </p>
        </div>
      </div>
    </div>
  );
}
