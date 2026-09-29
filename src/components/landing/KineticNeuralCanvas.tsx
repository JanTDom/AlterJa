"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  depth: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
}

export default function KineticNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50 &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
        mouse.targetX = width / 2;
        mouse.targetY = height / 2;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Impuls fali uderzeniowej (Shockwave ripple)
        particles.forEach((p) => {
          const dx = p.x - clickX;
          const dy = p.y - clickY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 350) {
            const force = (350 - dist) / 12;
            p.vx += (dx / (dist || 1)) * force;
            p.vy += (dy / (dist || 1)) * force;
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Paleta cząstek kognitywnych: lodowy błękit, indygo, cyjan i fiolet
    const COLORS = [
      "rgba(56, 189, 248, ", // Sky 400
      "rgba(99, 102, 241, ", // Indigo 500
      "rgba(167, 216, 255, ", // Ice blue
      "rgba(192, 132, 252, ", // Purple 400
      "rgba(255, 255, 255, ", // Pure white
    ];

    let particles: Particle[] = [];
    const PARTICLE_COUNT = Math.min(Math.floor((width * height) / 3800), 220);

    const initParticles = () => {
      particles = [];
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Generujemy cząstki w strukturze sferyczno-orbitalnej (jądro tożsamości)
        const depth = Math.random() * 0.8 + 0.2;
        const angle = Math.random() * Math.PI * 2;
        // Rozkład wielopierścieniowy
        const ring = Math.random();
        let radius = 0;
        if (ring < 0.4) {
          // Jądro wewnętrzne
          radius = Math.random() * 120 + 20;
        } else if (ring < 0.75) {
          // Środkowy pierścień neuronalny
          radius = Math.random() * 220 + 120;
        } else {
          // Zewnętrzna chmura kognitywna
          radius = Math.random() * 380 + 220;
        }

        const px = centerX + Math.cos(angle) * radius;
        const py = centerY + Math.sin(angle) * (radius * 0.65); // Elipsa w perspektywie

        particles.push({
          x: px,
          y: py,
          originX: px,
          originY: py,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.4 + 1.2,
          baseAlpha: Math.random() * 0.6 + 0.2,
          alpha: Math.random() * 0.6 + 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          depth,
          orbitRadius: radius,
          orbitAngle: angle,
          orbitSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    initParticles();

    let time = 0;

    const animate = () => {
      time += 0.015;

      // Płynna interpolacja pozycji kursora
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Rysowanie centralnej poświaty jądra tożsamości
      const coreGradient = ctx.createRadialGradient(
        centerX + (mouse.x - centerX) * 0.15,
        centerY + (mouse.y - centerY) * 0.15,
        10,
        centerX,
        centerY,
        width * 0.4
      );
      coreGradient.addColorStop(0, "rgba(56, 189, 248, 0.14)");
      coreGradient.addColorStop(0.35, "rgba(99, 102, 241, 0.07)");
      coreGradient.addColorStop(0.7, "rgba(8, 10, 13, 0.02)");
      coreGradient.addColorStop(1, "rgba(8, 10, 13, 0)");

      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, width, height);

      // Aktualizacja i rysowanie linii synaptycznych
      const MAX_DIST = 95;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * 0.22 * p1.depth;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Aktualizacja i rysowanie cząstek
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ruch orbitalny
        p.orbitAngle += p.orbitSpeed;
        const breath = Math.sin(time + p.orbitRadius * 0.02) * 8;
        const targetX = centerX + Math.cos(p.orbitAngle) * (p.orbitRadius + breath);
        const targetY = centerY + Math.sin(p.orbitAngle) * ((p.orbitRadius + breath) * 0.65);

        // Siła powrotu do orbity
        p.vx += (targetX - p.x) * 0.015;
        p.vy += (targetY - p.y) * 0.015;

        // Oddziaływanie myszy (interaktywność)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Cząstki wirują wokół kursora i lekko odpychają
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 1.5;
            p.vy -= Math.sin(angle) * force * 1.5;
            p.alpha = Math.min(1, p.baseAlpha + force * 0.5);
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.05;
        }

        // Tłumienie prędkości (damping)
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Rysowanie cząstki ze świetlistą aureolą
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = "rgba(56, 189, 248, 0.8)";
        ctx.shadowBlur = 8 * p.depth;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-700"
        aria-hidden="true"
      />
      {/* Subtelna instrukcja mikro-interakcji w rogu */}
      <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-white/10 text-[10px] font-mono text-slate-400 pointer-events-none backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        <span>Pole kinetyczne · Autonomiczne synapsy reagują na ruch kursora</span>
      </div>
    </div>
  );
}
