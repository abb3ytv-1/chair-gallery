import type { Chair } from "../types/Chair";

export function ChairDetail({ chair }: { chair: Chair }) {
  return (
    <section className="rounded-3xl bg-stone-950 p-5 text-white shadow-xl shadow-stone-950/15 dark:bg-black">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
            Featured Seat
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight">
            {chair.name}
          </h1>
        </div>
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-amber-200 text-4xl">
          {chair.emoji}
        </div>
      </div>

      <p className="mt-4 text-[15px] font-bold leading-7 text-stone-200">
        {chair.decree}
      </p>
      <p className="mt-2 text-[15px] leading-7 text-stone-300">
        {chair.detail}
      </p>
    </section>
  );
}
