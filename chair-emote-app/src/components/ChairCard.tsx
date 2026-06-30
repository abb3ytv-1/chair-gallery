"use client";

import type { Chair } from "../types/Chair";

type ChairCardProps = {
  chair: Chair;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect?: (chair: Chair) => void;
};

export function ChairCard({
  chair,
  favorite,
  onToggleFavorite,
  onSelect,
}: ChairCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(chair)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.(chair);
        }
      }}
      className="group relative cursor-pointer rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-200 dark:border-white/10 dark:bg-white/10"
    >
      <div className="flex items-start gap-3">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#efe3d0] text-3xl dark:bg-white/15">
          {chair.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-black">{chair.name}</h2>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                {chair.owner}
              </p>
            </div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite(chair.id);
              }}
              aria-label={
                favorite
                  ? `Remove ${chair.name} from favorites`
                  : `Add ${chair.name} to favorites`
              }
              className={`grid size-10 shrink-0 place-items-center rounded-full border text-lg transition active:scale-95 ${
                favorite
                  ? "border-[#b73f32] bg-[#b73f32] text-white"
                  : "border-stone-900/10 bg-stone-50 text-stone-500 dark:border-white/10 dark:bg-white/10 dark:text-stone-300"
              }`}
            >
              {favorite ? "★" : "☆"}
            </button>
          </div>
          <p className="mt-3 text-[15px] font-bold leading-6">{chair.decree}</p>
          <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
            {chair.detail}
          </p>
          <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200">
            {chair.mood}
          </span>
        </div>
      </div>
    </article>
  );
}
