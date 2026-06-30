"use client";

import { useEffect, useMemo, useState } from "react";
import { ChairCard } from "../../components/ChairCard";
import { ChairModal } from "../../components/ChairModal";
import { MobileShell } from "../../components/MobileShell";
import { SearchBar } from "../../components/SearchBar";
import { chairs } from "../../data/chairs";
import { useFavorites } from "../../hooks/useFavorites";
import type { Chair, ChairMood } from "../../types/Chair";

const moodOptions = Array.from(new Set(chairs.map((chair) => chair.mood)));

export default function ChairsPage() {
  const [query, setQuery] = useState("");
  const [activeMood, setActiveMood] = useState<ChairMood | "All">("All");
  const [savedFirst, setSavedFirst] = useState(false);
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

  const filteredChairs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matches = chairs.filter((chair) => {
      const matchesMood = activeMood === "All" || chair.mood === activeMood;
      const matchesQuery =
        !normalizedQuery ||
        [chair.name, chair.owner, chair.mood, chair.decree, chair.detail]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesMood && matchesQuery;
    });

    if (!savedFirst) return matches;

    return [...matches].sort((a, b) => {
      const aFavorite = favoriteIds.includes(a.id);
      const bFavorite = favoriteIds.includes(b.id);

      if (aFavorite === bFavorite) return a.name.localeCompare(b.name);
      return aFavorite ? -1 : 1;
    });
  }, [activeMood, favoriteIds, query, savedFirst]);

  const activeFilterCount =
    (query.trim() ? 1 : 0) + (activeMood === "All" ? 0 : 1);

  const clearFilters = () => {
    setQuery("");
    setActiveMood("All");
  };

  useEffect(() => {
    if (!selectedChair) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedChair(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedChair]);

  return (
    <MobileShell title="Chair Archive" eyebrow={`${chairs.length} seats`}>
      <div className="space-y-4">
        <section>
          <h1 className="text-3xl font-black leading-tight">Find a chair</h1>
          <p className="mt-2 text-[15px] leading-7 text-stone-600 dark:text-stone-300">
            Browse every active seat and save the ones that deserve permanent
            council attention.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-stone-950 p-3 text-white shadow-sm dark:bg-black">
            <div className="text-xl font-black">{chairs.length}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-stone-300">
              Total
            </div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-white/10">
            <div className="text-xl font-black">{favoriteIds.length}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-stone-500 dark:text-stone-300">
              Saved
            </div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-white/10">
            <div className="text-xl font-black">{moodOptions.length}</div>
            <div className="mt-0.5 text-[11px] font-semibold text-stone-500 dark:text-stone-300">
              Moods
            </div>
          </div>
        </section>

        <SearchBar value={query} onChange={setQuery} />

        <section className="space-y-3">
          <div className="-mx-4 overflow-x-auto px-4 pb-1">
            <div className="flex min-w-max gap-2">
              {(["All", ...moodOptions] as const).map((mood) => {
                const active = activeMood === mood;

                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setActiveMood(mood)}
                    className={`h-10 rounded-full px-4 text-sm font-bold transition active:scale-95 ${
                      active
                        ? "bg-stone-950 text-white dark:bg-amber-200 dark:text-stone-950"
                        : "bg-white text-stone-600 shadow-sm dark:bg-white/10 dark:text-stone-300"
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black">
                {filteredChairs.length} result
                {filteredChairs.length === 1 ? "" : "s"}
              </h2>
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {activeFilterCount > 0
                  ? `${activeFilterCount} filter${
                      activeFilterCount === 1 ? "" : "s"
                    } active`
                  : "Full archive"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSavedFirst((current) => !current)}
              className={`h-10 rounded-full px-4 text-sm font-bold transition active:scale-95 ${
                savedFirst
                  ? "bg-[#b73f32] text-white"
                  : "bg-white text-stone-600 shadow-sm dark:bg-white/10 dark:text-stone-300"
              }`}
            >
              Star First
            </button>
          </div>

          {filteredChairs.map((chair) => (
            <ChairCard
              key={chair.id}
              chair={chair}
              favorite={isFavorite(chair.id)}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelectedChair}
            />
          ))}

          {filteredChairs.length === 0 && (
            <div className="rounded-3xl border border-dashed border-stone-900/20 p-6 text-center dark:border-white/20">
              <h2 className="text-lg font-black">No chairs found</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                Try a name, owner, mood, or decree from the archive.
              </p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 h-11 rounded-full bg-stone-950 px-5 text-sm font-bold text-white active:scale-95 dark:bg-amber-200 dark:text-stone-950"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>
      </div>
      {selectedChair ? (
        <ChairModal chair={selectedChair} onClose={() => setSelectedChair(null)} />
      ) : null}
    </MobileShell>
  );
}
