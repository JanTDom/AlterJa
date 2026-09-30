"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { ApiClient } from "@/domains/types";
import {
  Terminal,
  Key,
  Plus,
  Trash2,
  Copy,
  Check,
  ShieldCheck,
  Code,
  Globe,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";

export default function DeveloperPage() {
  const [clients, setClients] = useState<ApiClient[]>([]);
  const [newName, setNewName] = useState("");
  const [newScope, setNewScope] = useState<"style_only" | "memory_query" | "persona_interactive">("style_only");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [createdClient, setCreatedClient] = useState<(ApiClient & { rawKey?: string }) | null>(null);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/developer/clients");
      const data = await res.json();
      if (data.success && Array.isArray(data.clients)) {
        setClients(data.clients);
      }
    } catch (err) {
      console.warn("Błąd pobierania klientów API:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Playground state
  const [testEndpoint, setTestEndpoint] = useState<"respond" | "transform" | "query">("transform");
  const [testInput, setTestInput] = useState("Proszę o krótką analizę problemu opóźnień w dostawach.");
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    try {
      const res = await fetch("/api/developer/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          scopes: [newScope],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCreatedClient({ ...data.client, rawKey: data.apiKey });
        setNewName("");
        fetchClients();
      }
    } catch (err) {
      console.warn("Błąd tworzenia klucza API:", err);
    }
  };

  const handleRevokeKey = async (clientId: string) => {
    try {
      const res = await fetch(`/api/developer/clients?id=${encodeURIComponent(clientId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchClients();
        if (createdClient?.id === clientId) setCreatedClient(null);
      }
    } catch (err) {
      console.warn("Błąd unieważnienia klucza API:", err);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runPlayground = async () => {
    setIsRunning(true);
    setTestOutput(null);

    try {
      if (testEndpoint === "transform") {
        const res = await fetch("/api/v1/style/transform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer alt_live_demo_test_token",
          },
          body: JSON.stringify({
            draft_text: testInput,
            instruction: "Zastosuj charakterystyczny rytm i precyzję słowną",
          }),
        });
        const data = await res.json();
        setTestOutput(JSON.stringify(data, null, 2));
      } else if (testEndpoint === "respond") {
        const res = await fetch("/api/v1/persona/respond", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer alt_live_demo_test_token",
          },
          body: JSON.stringify({
            message: testInput,
            mode: "reconstruction",
          }),
        });
        const data = await res.json();
        setTestOutput(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch("/api/v1/memory/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer alt_live_demo_test_token",
          },
          body: JSON.stringify({
            query: testInput,
            limit: 3,
          }),
        });
        const data = await res.json();
        setTestOutput(JSON.stringify(data, null, 2));
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Błąd połączenia";
      setTestOutput(JSON.stringify({ error: msg }, null, 2));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans selection:bg-alterja-accent/15 selection:text-alterja-accent">
      <Navbar />

      {/* PEŁNOFORMATOWA KINOWA SCENA FOTOGRAFICZNA (PORTAL-MIRROR) */}
      <section className="relative w-full min-h-[400px] md:min-h-[460px] flex items-center overflow-hidden bg-slate-950">
        <Image
          src="/images/alterja-core.jpg"
          alt="Kwantowy rdzeń obliczeniowy i bezpieczna bramka API AlterJa"
          fill
          priority
          className="object-cover object-center filter brightness-90 contrast-110 scale-[1.01]"
        />

        {/* Dynamiczny skaner biometryczny */}
        <div className="absolute inset-0 scanline-bar opacity-30 pointer-events-none" />

        {/* Kurtyna asymetryczna */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/20 text-blue-300 text-xs font-mono backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Platforma API · Integracja z Twoim ekosystemem</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white editorial-display leading-tight">
              Portal deweloperski i klucze API
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-xl">
              Wepnij swojego sobowtóra do poczty, komunikatorów i systemów firmy. Niech odpisuje i decyduje za Ciebie 24/7 z pełną ochroną kryptograficzną.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/api/v1/openapi.json"
              target="_blank"
              className="btn-luxe-light !py-3 !px-5 text-xs shadow-2xl active:scale-95"
            >
              <Code className="w-4 h-4 text-alterja-blue" />
              <span>Specyfikacja OpenAPI 3.1</span>
            </Link>
          </div>
        </div>
      </section>

      {/* OBSZAR ROBOCZY */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 relative z-20 -mt-10 sm:-mt-12">
        {/* Modal / alert wygenerowania nowego klucza */}
        {createdClient && (
          <div className="p-6 rounded-3xl bg-amber-50/95 backdrop-blur-xl border border-amber-300 space-y-3 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-900 font-bold">
                Nowy klucz API został pomyślnie wygenerowany
              </span>
              <button
                onClick={() => setCreatedClient(null)}
                className="text-amber-800 hover:text-amber-950 text-xs font-medium"
              >
                Zamknij powiadomienie
              </button>
            </div>
            <p className="text-xs text-slate-700">
              Skopiuj klucz teraz. Ze względów bezpieczeństwa w bazie zapisany jest wyłącznie bezpieczny skrót SHA-256 i pełna wartość nie zostanie wyświetlona ponownie:
            </p>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-amber-200 font-mono text-xs text-slate-900 shadow-inner">
              <span className="flex-1 truncate font-bold text-alterja-blue">{createdClient.rawKey || createdClient.api_key || "Klucz wygenerowany"}</span>
              <button
                onClick={() => handleCopy(createdClient.rawKey || createdClient.api_key || "", createdClient.id)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                {copiedKey === createdClient.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === createdClient.id ? "Skopiowano" : "Kopiuj"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Formularz tworzenia klucza + Lista aktywnych kluczy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tworzenie nowego klucza */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
            <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display flex items-center gap-2">
              <Key className="w-5 h-5 text-alterja-blue" />
              <span>Wygeneruj nowy klucz</span>
            </h2>
            <p className="text-xs text-slate-600">
              Określ nazwę integracji oraz dopuszczalny zakres operacji Twojego sobowtóra.
            </p>

            <form onSubmit={handleCreateKey} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Nazwa aplikacji klienta</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="np. Notion Sync, Slack Bot, E-mail"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 mb-1">Dopuszczalny zakres (Grant Scope)</label>
                <select
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner"
                >
                  <option value="style_only">style:transform — tylko styl (bez faktów)</option>
                  <option value="memory_query">memory:read — odpytywanie dopuszczonej pamięci</option>
                  <option value="persona_interactive">persona:respond — pełna rozmowa</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-xs font-medium text-white shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Utwórz klucz API</span>
              </button>
            </form>
          </div>

          {/* Lista aktywnych integracji */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Aktywne poświadczenia API</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">{clients.length} aktywne klucze</span>
            </div>

            <div className="space-y-3">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">{c.name}</span>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono bg-blue-50 text-alterja-blue border border-blue-200 font-bold">
                        {c.grants && c.grants.length > 0
                          ? c.grants.map((g) => g.grant_type).join(", ")
                          : "style_only"}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">
                      ID: {c.client_id} · Klucz: {c.api_key ? c.api_key.substring(0, 14) + "..." : "alt_live_••••••••"} · Utworzono: {new Date(c.created_at).toLocaleDateString("pl-PL")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRevokeKey(c.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs flex items-center gap-1 transition-colors"
                      title="Natychmiast unieważnij ten klucz"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Unieważnij</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interaktywny API Playground */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-serif font-medium text-slate-950 editorial-display flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-600" />
                <span>Interaktywne testowanie zapytań (API Playground)</span>
              </h2>
              <p className="text-xs text-slate-600">
                Wyślij rzeczywiste zapytanie HTTP do lokalnego interfejsu bramki API AlterJa.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setTestEndpoint("transform")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  testEndpoint === "transform" ? "bg-white text-alterja-blue shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                /style/transform
              </button>
              <button
                onClick={() => setTestEndpoint("respond")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  testEndpoint === "respond" ? "bg-white text-alterja-blue shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                /persona/respond
              </button>
              <button
                onClick={() => setTestEndpoint("query")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  testEndpoint === "query" ? "bg-white text-alterja-blue shadow-sm font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                /memory/query
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-600">Tekst wejściowy (Payload input):</label>
              <textarea
                rows={7}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-alterja-blue shadow-inner leading-relaxed"
              />
              <button
                onClick={runPlayground}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-xs font-medium text-white shadow-md transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isRunning ? "Wysyłanie zapytania..." : "Wyślij testowe żądanie POST"}</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-600">Odpowiedź serwera (JSON Response):</label>
              <div className="h-[188px] overflow-auto p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre shadow-inner">
                {testOutput ? testOutput : "// Kliknij 'Wyślij testowe żądanie POST', aby zobaczyć wynik"}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
