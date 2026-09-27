"use client";

import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { ConversationMode, Message } from "@/domains/types";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";

export default function ChatPage() {
  const [mode, setMode] = useState<ConversationMode>("reconstruction");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentConvId, setCurrentConvId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Inicjalizacja pierwszej rozmowy
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
      // Wiadomość powitalna dopasowana do trybu
      const welcome = globalStore.addMessage(
        convId,
        DEMO_USER_ID,
        "assistant",
        "Dzień dobry. Jestem gotowy do rozmowy. Działam w trybie: Rekonstrukcja — opieram się wyłącznie na autoryzowanych źródłach w Twojej bibliotece pamięci.",
        { mode: "reconstruction" }
      );
      setMessages([welcome]);
    } else {
      setMessages(existingMsgs);
    }
  }, [mode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userText = input.trim();
    setInput("");

    // 1. Zapis wiadomości użytkownika
    const userMsg = globalStore.addMessage(currentConvId, DEMO_USER_ID, "user", userText);
    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/v1/persona/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userText,
          mode,
          userId: DEMO_USER_ID,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        throw new Error("Błąd API generatora odpowiedzi");
      }

      const data = await res.json();

      const assistantMsg = globalStore.addMessage(
        currentConvId,
        DEMO_USER_ID,
        "assistant",
        data.content,
        {
          mode: data.mode,
          grounding_citations: data.citations,
          uncertainty_level: data.uncertainty,
        }
      );

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") {
        console.log("Generowanie zatrzymane przez użytkownika");
      } else {
        const errorMsg = globalStore.addMessage(
          currentConvId,
          DEMO_USER_ID,
          "assistant",
          "Wystąpił problem z połączeniem z silnikiem modeli. Odpowiedź została wstrzymana w bezpiecznym stanie.",
          { mode }
        );
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex flex-col flex-1 h-[calc(100vh-4rem)]">
      {/* Przełącznik 3 trybów */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-alterja-border mb-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setMode("reconstruction")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
              mode === "reconstruction"
                ? "bg-alterja-blue text-white shadow-lg shadow-alterja-blue/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Tryb: Rekonstrukcja</span>
          </button>

          <button
            onClick={() => setMode("assistant")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
              mode === "assistant"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tryb: Asystent</span>
          </button>

          <button
            onClick={() => setMode("critic")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
              mode === "critic"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tryb: Krytyczny partner</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 hidden sm:block">
          {mode === "reconstruction" && "Przewiduje reakcję na bazie Twoich źródeł"}
          {mode === "assistant" && "Proponuje obiektywnie najlepszą pomoc"}
          {mode === "critic" && "Testuje spójność założeń i wskazuje luki"}
        </div>
      </div>

      {/* Okno czatu */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl glass-panel border border-alterja-border">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
            >
              <div className="flex items-center space-x-2 text-[11px] text-slate-400 px-1">
                <span>{isUser ? "Ty" : "AlterJa"}</span>
                {msg.mode && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {msg.mode}
                  </span>
                )}
                {msg.uncertainty_level && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded ${
                      msg.uncertainty_level === "high"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    Pewność: {msg.uncertainty_level}
                  </span>
                )}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? "bg-alterja-blue text-white rounded-br-none"
                    : "bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-none shadow-md"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* Cytowania dowodowe (Grounding) */}
                {msg.grounding_citations && msg.grounding_citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] text-amber-400 font-semibold flex items-center space-x-1">
                      <Quote className="w-3 h-3" />
                      <span>Uzasadnienie źródłowe z pamięci:</span>
                    </div>
                    {msg.grounding_citations.map((cite, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800"
                      >
                        <span className="font-semibold text-slate-400 not-italic block mb-0.5">
                          {cite.title}:
                        </span>
                        „{cite.quote}”
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Formularz wprowadzania wiadomości */}
      <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "reconstruction"
              ? "Zadaj pytanie, by sprawdzić jak odpowiedziałby Twój model..."
              : "Napisz wiadomość..."
          }
          disabled={isGenerating}
          className="flex-1 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-alterja-blue focus:ring-1 focus:ring-alterja-blue disabled:opacity-50"
        />

        {isGenerating ? (
          <button
            type="button"
            onClick={handleStop}
            className="px-5 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium flex items-center space-x-1.5 transition-colors"
          >
            <Square className="w-4 h-4" />
            <span>Zatrzymaj</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-alterja-blue to-alterja-purple text-white text-sm font-medium flex items-center space-x-1.5 hover:opacity-95 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-alterja-blue/20"
          >
            <span>Wyślij</span>
            <Send className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
}
