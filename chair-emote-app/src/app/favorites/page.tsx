"use client";

import Link from "next/link";
import { ChairCard } from "../../components/ChairCard";
import { MobileShell } from "../../components/MobileShell";
import { chairs } from "../../data/chairs";
import { useFavorites } from "../../hooks/useFavorites";

export default function FavoritesPage() {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const favoriteChairs = chairs.filter((chair) => favoriteIds.includes(chair.id));

  return (
    <MobileShell title="Favorite Chairs" eyebrow={`${favoriteChairs.length} saved`}>
      <div className="space-y-4">
        <section>
          <h1 className="text-3xl font-black leading-tight">Saved seats</h1>
          <p className="mt-2 text-[15px] leading-7 text-stone-600 dark:text-stone-300">
            Your favored chairs stay on this device so the council can resume
            precisely where it left off.
          </p>
        </section>

        {favoriteChairs.length > 0 ? (
          <section className="space-y-3">
            {favoriteChairs.map((chair) => (
              <ChairCard
                key={chair.id}
                chair={chair}
                favorite={isFavorite(chair.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-3xl border border-stone-900/10 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/10">
            <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#efe3d0] text-3xl dark:bg-white/15">
              ★
            </div>
            <h2 className="mt-4 text-xl font-black">No saved chairs yet</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
              Star a chair in the archive and it will appear here.
            </p>
            <Link
              href="/chairs"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-stone-950 px-5 text-sm font-bold text-white active:scale-95 dark:bg-amber-200 dark:text-stone-950"
            >
              Open archive
            </Link>
          </section>
        )}
      </div>
    </MobileShell>
  );
}
