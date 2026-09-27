"use client";

import React, { useState } from "react";
import {
  Brain,
  Search,
  Filter,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Plus,
  Quote,
  Layers,
  History,
} from "lucide-react";
import { globalStore, DEMO_USER_ID } from "@/lib/db/store";
import { MemoryItem, MemoryLayer, EpistemicStatus } from "@/domains/types";

const LAYERS: { key: MemoryLayer | "all"; label: string }[] = [
  { key: "all", label: "Wszystkie warstwy" },
  { key: "biography", label: "1. Biografia" },
  { key: "knowledge", label: "2. Wiedza" },
  { key: "style", label: "3. Styl" },
  { key: "preferences", label: "4. Preferencje" },
  { key: "values", label: "5. Wartości" },
  { key: "decisions", label: "6. Decyzje" },
  { key: "context", label: "7. Kontekst" },
];

export default function MemoryLibraryPage() {
  const [selectedLayer, setSelectedLayer] = useState<MemoryLayer | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [memories, setMemories] = useState<MemoryItem[]>(() =>
    globalStore.getMemories(DEMO_USER_ID)
  );
  const [editingItem, setEditingItem] = useState<MemoryItem | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLayer, setAddLayer] = useState<MemoryLayer>("preferences");
  const [addTitle, setAddTitle] = useState("");
  const [addContent, setAddContent] = useState("");
  const [addQuote, setAddQuote] = useState("");

  const refresh = () => {
    setMemories([...globalStore.getMemories(DEMO_USER_ID)]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Czy na pewno chcesz trwale usunąć ten wpis pamięci wraz z dowodami?")) {
      globalStore.deleteMemory(DEMO_USER_ID, id);
      refresh();
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    globalStore.updateMemory(DEMO_USER_ID, editingItem.id, {
      title: newTitle,
      content: newContent,
      confidence: "confirmed",
    });
    setEditingItem(null);
    refresh();
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTitle.trim() || !addContent.trim()) return;

    globalStore.addMemory(DEMO_USER_ID, {
      layer: addLayer,
      title: addTitle.trim(),
      content: addContent.trim(),
      epistemic_status: "user_declaration",
      confidence: "confirmed",
      is_superseded: false,
      evidence: addQuote.trim()
        ? [
            {
              id: `ev-${Date.now()}`,
              user_id: DEMO_USER_ID,
              memory_item_id: "new",
              source_item_id: "manual",
              exact_quote: addQuote.trim(),
              source_title: "Wpis manualny użytkownika",
              created_at: new Date().toISOString(),
            },
          ]
        : [],
    });

    setShowAddModal(false);
    setAddTitle("");
    setAddContent("");
    setAddQuote("");
    refresh();
  };

  const filteredMemories = memories.filter((m) => {
    const matchesLayer = selectedLayer === "all" || m.layer === selectedLayer;
    const matchesSearch =
      !searchQuery.trim() ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLayer && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Nagłówek */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-alterja-border">
        <div>
          <span className="text-xs uppercase tracking-wider text-alterja-blue font-semibold">
            Baza wiedzy z pochodzeniem
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Biblioteka pamięci</h1>
          <p className="text-sm text-slate-400 mt-1">
            Ustrukturyzowana pamięć w 7 warstwach. Każdy fakt powiązany jest z cytatem źródłowym.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-alterja-blue hover:bg-blue-600 text-white text-sm font-medium flex items-center space-x-2 transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Dodaj wpis do pamięci</span>
        </button>
      </div>

      {/* Wyszukiwarka i filtry */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Szukaj we wspomnieniach, faktach, preferencjach..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:border-alterja-blue focus:ring-1 focus:ring-alterja-blue"
          />
        </div>

        {/* Zakładki warstw */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 md:pb-0">
          {LAYERS.map((layer) => (
            <button
              key={layer.key}
              onClick={() => setSelectedLayer(layer.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedLayer === layer.key
                  ? "bg-alterja-blue/20 text-blue-300 border border-alterja-blue/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista wpisów pamięci */}
      {filteredMemories.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400">
          <Brain className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-base font-medium text-slate-300">Brak wpisów spełniających kryteria</p>
          <p className="text-xs text-slate-500 mt-1">
            Zmień filtry wyszukiwania lub dodaj nowe źródło wiedzy.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              className="glass-panel rounded-2xl p-6 border border-alterja-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    Warstwa: {mem.layer}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-emerald-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{mem.confidence === "confirmed" ? "Potwierdzone" : "Robocze"}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{mem.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{mem.content}</p>

                {/* Cytat dowodowy */}
                {mem.evidence && mem.evidence.length > 0 && (
                  <div className="rounded-xl bg-slate-900/90 border border-amber-500/30 p-3.5 mb-4">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold mb-1">
                      <span className="flex items-center space-x-1">
                        <Quote className="w-3 h-3" />
                        <span>Dowód źródłowy</span>
                      </span>
                      <span className="text-slate-400 font-normal">
                        {mem.evidence[0].source_title || "Źródło"}
                      </span>
                    </div>
                    <blockquote className="text-xs italic text-slate-300 pl-2.5 border-l-2 border-amber-400/80">
                      „{mem.evidence[0].exact_quote}”
                    </blockquote>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <span className="text-slate-500 font-mono">Status: {mem.epistemic_status}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(mem);
                      setNewTitle(mem.title);
                      setNewContent(mem.content);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Koryguj treść"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(mem.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    title="Usuń trwale (RODO)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal edycji wpisu */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Korekta wpisu w pamięci</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tytuł wpisu</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Treść</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-alterja-blue hover:bg-blue-600 text-white text-xs font-medium"
                >
                  Zapisz korektę
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal dodawania nowego wpisu */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg glass-panel rounded-2xl p-6 border border-slate-700 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Dodaj nowy fakt do pamięci</h3>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Warstwa modelu</label>
                <select
                  value={addLayer}
                  onChange={(e) => setAddLayer(e.target.value as MemoryLayer)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                >
                  <option value="biography">1. Biografia i zdarzenia</option>
                  <option value="knowledge">2. Wiedza i doświadczenie</option>
                  <option value="style">3. Styl komunikacji</option>
                  <option value="preferences">4. Preferencje</option>
                  <option value="values">5. Wartości i priorytety</option>
                  <option value="decisions">6. Przypadki decyzyjne</option>
                  <option value="context">7. Kontekst sytuacyjny</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tytuł</label>
                <input
                  type="text"
                  placeholder="np. Preferencja stylu pracy w ciszy"
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Treść faktu</label>
                <textarea
                  rows={3}
                  placeholder="Opisz dokładnie fakt lub preferencję..."
                  value={addContent}
                  onChange={(e) => setAddContent(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Cytat źródłowy (opcjonalny)
                </label>
                <input
                  type="text"
                  placeholder="Dosłowny cytat z Twojej notatki lub wypowiedzi..."
                  value={addQuote}
                  onChange={(e) => setAddQuote(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-alterja-blue hover:bg-blue-600 text-white text-xs font-medium"
                >
                  Zapisz w pamięci
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
