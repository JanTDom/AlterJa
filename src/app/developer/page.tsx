"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import { store } from "@/lib/db/store";
import { ApiClient } from "@/domains/types";
import { Terminal, Key, Plus, Trash2, Copy, Check, ShieldCheck, Code, Globe, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DeveloperPage() {
  const [clients, setClients] = useState<ApiClient[]>(store.getApiClients());
  const [newName, setNewName] = useState("");
  const [newScope, setNewScope] = useState<"style_only" | "memory_query" | "persona_interactive">("style_only");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [createdClient, setCreatedClient] = useState<ApiClient | null>(null);

  // Playground state
  const [testEndpoint, setTestEndpoint] = useState<"respond" | "transform" | "query">("transform");
  const [testInput, setTestInput] = useState("Proszę o krótką analizę problemu opóźnień w dostawach.");
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const scopes = [newScope];
    const client = store.createApiClient(newName.trim(), scopes);
    setClients(store.getApiClients());
    setCreatedClient(client);
    setNewName("");
  };

  const handleRevokeKey = (clientId: string) => {
    store.revokeApiClient(clientId);
    setClients(store.getApiClients());
    if (createdClient?.id === clientId) setCreatedClient(null);
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
    <div className="min-h-screen bg-alter-dark text-slate-100 flex flex-col selection:bg-alter-blue/30 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Nagłówek */}
        <div className="border-b border-alter-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              Platforma API i bezpieczne integracje
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">Portal deweloperski</h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Kontrolowane udostępnianie stylu i pamięci dla aplikacji trzecich. Pełna specyfikacja OpenAPI 3.1, granularne granty oraz natychmiastowe unieważnianie kluczy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/api/v1/openapi.json"
              target="_blank"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-alter-card hover:bg-slate-800 border border-alter-border text-xs font-medium text-slate-200 transition-colors"
            >
              <Code className="w-4 h-4 text-alter-blue" />
              Specyfikacja OpenAPI (JSON)
            </Link>
          </div>
        </div>

        {/* Modal / alert wygenerowania nowego klucza */}
        {createdClient && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Nowy klucz API został pomyślnie wygenerowany
              </span>
              <button
                onClick={() => setCreatedClient(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Zamknij powiadomienie
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Skopiuj klucz teraz. Ze względów bezpieczeństwa w bazie zapisany jest wyłącznie bezpieczny skrót SHA-256 i pełna wartość nie zostanie wyświetlona ponownie:
            </p>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-alter-dark border border-alter-border font-mono text-xs text-white">
              <span className="flex-1 truncate">{createdClient.api_key}</span>
              <button
                onClick={() => handleCopy(createdClient.api_key || "", createdClient.id)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 flex items-center gap-1.5"
              >
                {copiedKey === createdClient.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === createdClient.id ? "Skopiowano" : "Kopiuj"}
              </button>
            </div>
          </div>
        )}

        {/* Formularz tworzenia klucza + Lista aktywnych kluczy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tworzenie nowego klucza */}
          <div className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
            <h2 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
              <Key className="w-4 h-4 text-alter-blue" />
              Wygeneruj nowy klucz dostępu
            </h2>
            <p className="text-xs text-slate-400">
              Określ nazwę integracji oraz dopuszczalny zakres operacji.
            </p>

            <form onSubmit={handleCreateKey} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Nazwa aplikacji klienta</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="np. Notion Sync, Slack Bot, Edytor e-mail"
                  className="w-full px-3 py-2 rounded-lg bg-alter-dark border border-alter-border text-xs text-white placeholder-slate-600 focus:outline-none focus:border-alter-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Dopuszczalny zakres (Grant Scope)</label>
                <select
                  value={newScope}
                  onChange={(e) => setNewScope(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-alter-dark border border-alter-border text-xs text-white focus:outline-none focus:border-alter-blue"
                >
                  <option value="style_only">style:transform — tylko styl (bez dostępu do faktów biograficznych)</option>
                  <option value="memory_query">memory:read — odpytywanie dopuszczonej pamięci</option>
                  <option value="persona_interactive">persona:respond — pełna rozmowa rekonstrukcyjna</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-alter-blue hover:bg-blue-600 text-xs font-medium text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Utwórz klucz API
              </button>
            </form>
          </div>

          {/* Lista aktywnych integracji */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Aktywne integracje i poświadczenia
              </h2>
              <span className="text-xs text-slate-400 font-mono">{clients.length} aktywne wpisy</span>
            </div>

            <div className="space-y-3">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-alter-dark/60 border border-alter-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">{c.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-alter-blue/10 text-alter-blue border border-alter-blue/20">
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
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs flex items-center gap-1 transition-colors"
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
        <section className="p-6 rounded-2xl bg-alter-card border border-alter-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-medium text-white tracking-tight flex items-center gap-2">
                <Play className="w-4 h-4 text-purple-400" />
                Interaktywne testowanie zapytań (API Playground)
              </h2>
              <p className="text-xs text-slate-400">Wyślij rzeczywiste zapytanie HTTP do lokalnego interfejsu bramki API AlterJa.</p>
            </div>

            <div className="flex items-center gap-1 bg-alter-dark p-1 rounded-lg border border-alter-border">
              <button
                onClick={() => setTestEndpoint("transform")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  testEndpoint === "transform" ? "bg-alter-blue text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                /style/transform
              </button>
              <button
                onClick={() => setTestEndpoint("respond")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  testEndpoint === "respond" ? "bg-alter-blue text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                /persona/respond
              </button>
              <button
                onClick={() => setTestEndpoint("query")}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  testEndpoint === "query" ? "bg-alter-blue text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                /memory/query
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-400">Tekst wejściowy (Payload input):</label>
              <textarea
                rows={7}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-alter-dark border border-alter-border font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-alter-blue leading-relaxed"
              />
              <button
                onClick={runPlayground}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-alter-blue hover:bg-blue-600 disabled:opacity-50 text-xs font-medium text-white transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                {isRunning ? "Wysyłanie zapytania..." : "Wyślij testowe żądanie POST"}
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-400">Odpowiedź serwera (JSON Response):</label>
              <div className="h-[188px] overflow-auto p-3 rounded-xl bg-alter-dark border border-alter-border font-mono text-xs text-emerald-400 whitespace-pre">
                {testOutput ? testOutput : "// Kliknij 'Wyślij testowe żądanie POST', aby zobaczyć wynik"}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
