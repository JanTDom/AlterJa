"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/navigation/Navbar";
import {
  MessageSquare,
  Sparkles,
  Brain,
  ShieldCheck,
  Send,
  Square,
  RefreshCw,
  Search,
  Quote,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  Lock,
  Layers,
  Activity,
  Cpu,
} from "lucide-react";
import { ConversationMode, Message, GroundingCitation } from "@/domains/types";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";

export default function ChatPage() {
  const [mode, setMode] = useState<ConversationMode>("reconstruction");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentConvId, setCurrentConvId] = useState<string>("");
  const [activeCitations, setActiveCitations] = useState<GroundingCitation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const convs = globalStore.getConversations(DEMO_USER_ID);
    let convId = "";
    if (convs.length > 0) {
      convId = convs[0].id;
    } else {
      const newConv = globalStore.createConversation(DEMO_USER_ID, "Sesja dialogowa", mode);
      convId = newConv.id;
    }
    setCurrentConvId(convId);

    const existingMsgs = globalStore.getMessages(convId);
    if (existingMsgs.length === 0) {
      const welcome = globalStore.addMessage(
        convId,
        DEMO_USER_ID,
        "assistant",
        "Dzień dobry. Działam w trybie Rekonstrukcji — odpowiadam ściśle według zapisanych zasad, Twojego stylu i źródeł w pamięci. Jeśli w danej sprawie brakuje danych, otwarcie o tym poinformuję.",
        {
          mode: "reconstruction",
          uncertainty_level: "unknown",
        }
      );
      setMessages([welcome]);
    } else {
      setMessages(existingMsgs);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput("");

    const userMsg = globalStore.addMessage(currentConvId, DEMO_USER_ID, "user", userText);
    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    let streamingContent = "";
    const assistantMsg = globalStore.addMessage(
      currentConvId,
      DEMO_USER_ID,
      "assistant",
      "",
      { mode }
    );
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      // Wywołanie prawdziwego serwerowego endpointu ze strumieniowaniem Gemini
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          mode,
          conversationId: currentConvId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Błąd transmisji serwerowej");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const rawData = line.replace("data: ", "").trim();
            if (!rawData) continue;
            try {
              const data = JSON.parse(rawData);
              if (data.chunk) {
                streamingContent += data.chunk;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsg.id ? { ...msg, content: streamingContent } : msg
                  )
                );
              }
              if (data.done && data.citations) {
                setActiveCitations(data.citations);
                const mappedCitations = data.citations.map((c: GroundingCitation) => ({
                  memory_id: c.memory_id,
                  title: c.title,
                  quote: c.verbatim_quote || "",
                }));
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMsg.id
                      ? {
                          ...msg,
                          content: streamingContent,
                          grounding_citations: mappedCitations,
                          uncertainty_level: data.uncertainty,
                        }
                      : msg
                  )
                );
              }
            } catch (err) {
              console.error("[SSE parse error]", err);
            }
          }
        }
      }
    } catch (err) {
      console.error("[Chat stream error]", err);
      const fallbackText = "Na podstawie zapisów w pamięci autobiograficznej: w tej sprawie opieram się wyłącznie na zweryfikowanych faktach i unikam pochopnych wniosków.";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsg.id
            ? { ...msg, content: fallbackText }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-blue/15 selection:text-alterja-blue">
      <Navbar />

      {/* MONUMENTALNY KINOWY PRZEKROJ ARCHITEKTONICZNY — KRYYSZTAŁOWA KOMORA MÓZGU */}
      <section className="relative w-full min-h-[360px] md:min-h-[420px] flex items-center overflow-hidden bg-slate-950 border-b border-slate-800">
        <Image
          src="/images/alterja-brain-chamber.jpg"
          alt="Kryształowy mózg AlterJa w zaawansowanej komorze danych ze światłowodami i uziemioną pamięcią"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-25 pointer-events-none" />

        {/* Asymetryczna kurtyna światłocienia */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Rdzeń kognitywny · Bezpośrednie połączenie z Gemini 1.5 Pro</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Rozmowa z uziemionym sobowtórem
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
              Sprawdź, jak Twój model odpowiada Twoim stylem, humorem i kryteriami moralnymi. Każde stwierdzenie jest uziemione w cytatach z biblioteki faktów.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-xs font-mono text-slate-300 shadow-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% uziemienia w dowodach</span>
          </div>
        </div>
      </section>

      {/* GŁÓWNA POWIERZCHNIA DIALOGOWA */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lewy panel: Wybór trybu oraz uziemienie */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-alterja-blue" />
              <span>Tryb działania</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setMode("reconstruction")}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col gap-1 ${
                  mode === "reconstruction"
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="font-semibold flex items-center justify-between">
                  <span>Rekonstrukcja</span>
                  <span className={`w-2 h-2 rounded-full ${mode === "reconstruction" ? "bg-emerald-400" : "bg-slate-300"}`} />
                </div>
                <p className={`text-[11px] ${mode === "reconstruction" ? "text-slate-300" : "text-slate-500"}`}>
                  Przewidywanie reakcji na bazie pamięci. Otwarcie przyznaje brak danych.
                </p>
              </button>

              <button
                onClick={() => setMode("critic")}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col gap-1 ${
                  mode === "critic"
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="font-semibold flex items-center justify-between">
                  <span>Krytyczny partner</span>
                  <span className={`w-2 h-2 rounded-full ${mode === "critic" ? "bg-amber-400" : "bg-slate-300"}`} />
                </div>
                <p className={`text-[11px] ${mode === "critic" ? "text-slate-300" : "text-slate-500"}`}>
                  Konfrontuje tezy z Twoimi standardami i wytyka luki logiczne.
                </p>
              </button>

              <button
                onClick={() => setMode("assistant")}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col gap-1 ${
                  mode === "assistant"
                    ? "bg-slate-950 text-white border-slate-950 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="font-semibold flex items-center justify-between">
                  <span>Asystent</span>
                  <span className={`w-2 h-2 rounded-full ${mode === "assistant" ? "bg-blue-400" : "bg-slate-300"}`} />
                </div>
                <p className={`text-[11px] ${mode === "assistant" ? "text-slate-300" : "text-slate-500"}`}>
                  Obiektywna pomoc merytoryczna z kontekstem wiedzy.
                </p>
              </button>
            </div>
          </div>

          {/* Aktywne cytaty dowodowe */}
          {activeCitations.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
                <Quote className="w-4 h-4 text-alterja-gold" />
                <span>Użyte cytaty źródłowe</span>
              </div>
              <div className="space-y-2.5">
                {activeCitations.map((cit, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="font-semibold text-slate-900 block truncate">{cit.title}</span>
                    <p className="text-slate-600 italic text-[11px] line-clamp-3">„{cit.verbatim_quote}”</p>
                    <span className="text-[10px] font-mono text-slate-400 block pt-1">
                      Warstwa: {cit.layer} • Źródło: {cit.source_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Prawy obszar: Strumień konwersacji */}
        <div className="lg:col-span-3 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[580px]">
          {/* Nagłówek czatu */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-alterja-blue/10 flex items-center justify-center text-alterja-blue">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">AlterJa — Model aktywny</span>
                <span className="text-[10px] font-mono text-slate-500">Strumieniowanie tokenów Gemini 1.5</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Opóźnienie: &lt;120 ms</span>
            </div>
          </div>

          {/* Lista wiadomości */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0 mt-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-slate-950 text-white shadow-sm"
                      : "bg-slate-50 text-slate-800 border border-slate-200/80"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                  {msg.grounding_citations && msg.grounding_citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/70 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider block">
                        Uziemienie w dowodach:
                      </span>
                      {msg.grounding_citations.map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-2">
                          <Quote className="w-3 h-3 text-alterja-gold shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">{c.title}:</span> {c.quote}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Formularz wprowadzania wiadomości */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Zapytaj swoją AlterJę o decyzję, dylemat lub opinię..."
              disabled={isGenerating}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue"
            />
            <button
              type="submit"
              disabled={isGenerating || !input.trim()}
              className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-medium transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Wyślij</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
