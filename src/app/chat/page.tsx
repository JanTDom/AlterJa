"use client";

import React, { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { ConversationMode, Message } from "@/domains/types";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { geminiClient } from "@/lib/gemini/client";

export default function ChatPage() {
  const [mode, setMode] = useState<ConversationMode>("reconstruction");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentConvId, setCurrentConvId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

    const userProfile = globalStore.getProfile(DEMO_USER_ID);
    const memories = globalStore.getMemories(DEMO_USER_ID);
    const memorySnippet = memories
      .slice(0, 4)
      .map((m) => `[${m.layer}] ${m.title}: ${m.content}`)
      .join("\n");

    let systemInstruction = "";
    if (mode === "reconstruction") {
      systemInstruction = `Jesteś AlterJa (cyfrowy model ${userProfile?.display_name}).
ZASADY TRYBU REKONSTRUKCJI:
- Przewiduj reakcję i styl osoby na bazie pamięci:
${memorySnippet}
- Jeśli nie wiesz lub nie ma dowodu, napisz wprost: "Na podstawie dotychczasowych zapisków nie mam wyrobionego zdania w tej sprawie".
- Zero dekoracyjnych emoji. Precyzyjna polszczyzna.`;
    } else if (mode === "critic") {
      systemInstruction = `Jesteś Krytycznym Partnerem AlterJa. Analizujesz tezy rozmówcy przez pryzmat zasad ${userProfile?.display_name}, wskazując luki w rozumowaniu i ryzyka.`;
    } else {
      systemInstruction = `Jesteś Asystentem AlterJa. Pomagasz rozwiązać problem merytorycznie, korzystając z kontekstu wiedzy użytkownika.`;
    }

    try {
      let streamingContent = "";
      const assistantMsg = globalStore.addMessage(
        currentConvId,
        DEMO_USER_ID,
        "assistant",
        "...",
        { mode }
      );
      setMessages((prev) => [...prev, assistantMsg]);

      await geminiClient.streamConversation({
        prompt: userText,
        systemInstruction,
        onChunk: (chunk) => {
          streamingContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsg.id ? { ...msg, content: streamingContent } : msg
            )
          );
        },
      });

      // Uzupełnienie cytatów dowodowych
      const topMem = memories[0];
      const citations = topMem
        ? [
            {
              memory_id: topMem.id,
              title: topMem.title,
              quote: topMem.content.slice(0, 90) + "...",
            },
          ]
        : [];

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMsg.id
            ? { ...msg, content: streamingContent, grounding_citations: citations }
            : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.content === "..."
            ? {
                ...msg,
                content:
                  "Wystąpił chwilowy błąd inferencji. W trybie offline: opierając się na zasadach pryncypialnych, zalecam ostrożność i weryfikację założeń.",
              }
            : msg
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 w-full flex flex-col h-[calc(100vh-5rem)]">
        {/* Przełącznik 3 trybów */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setMode("reconstruction")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                mode === "reconstruction"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Tryb: Rekonstrukcja</span>
            </button>

            <button
              onClick={() => setMode("assistant")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                mode === "assistant"
                  ? "bg-alterja-blue text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tryb: Asystent</span>
            </button>

            <button
              onClick={() => setMode("critic")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                mode === "critic"
                  ? "bg-purple-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tryb: Krytyczny partner</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 hidden sm:block font-medium">
            {mode === "reconstruction" && "Przewidywanie Twojej reakcji z dowodami"}
            {mode === "assistant" && "Obiektywna pomoc merytoryczna"}
            {mode === "critic" && "Testowanie spójności i wyszukiwanie luk"}
          </div>
        </div>

        {/* Kontener konwersacji */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-card">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}
              >
                <div
                  className={`max-w-2xl px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? "bg-slate-950 text-white rounded-br-sm"
                      : "bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>

                {/* Cytaty uziemiające (Grounding Citations) */}
                {m.grounding_citations && m.grounding_citations.length > 0 && (
                  <div className="max-w-xl p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] text-blue-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-[10px] text-alterja-blue font-bold">
                      <Quote className="w-3 h-3" />
                      <span>Cytat źródłowy z biblioteki pamięci:</span>
                    </div>
                    <p className="italic font-serif">„{m.grounding_citations[0].quote}”</p>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Pole wprowadzania wiadomości */}
        <form onSubmit={handleSubmit} className="pt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Zadaj pytanie swojemu modelowi..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-sm font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-2 transition-all shadow-sm shrink-0"
          >
            <span>Wyślij</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </main>
    </div>
  );
}
