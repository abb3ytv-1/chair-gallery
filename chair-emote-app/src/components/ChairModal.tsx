"use client";

import Image from "next/image";
import type { Chair } from "../types/Chair";

type ChairModalProps = {
  chair: Chair;
  onClose: () => void;
};

export function ChairModal({ chair, onClose }: ChairModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-stone-950/20 dark:bg-stone-950">
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
              Chair details
            </p>
            <h2 className="mt-2 text-2xl font-black text-stone-950 dark:text-white">
              {chair.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-100 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800"
          >
            Close
          </button>
        </div>

        <div className="space-y-4 p-5">
          {chair.image ? (
            <div className="relative h-95 w-full overflow-hidden rounded-[1.5rem] shadow-inner shadow-stone-950/10">
              <Image
                src={chair.image}
                alt={chair.name}
                fill
                className="object-cover object-bottom"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : (
            <div className="grid h-72 w-full place-items-center rounded-[1.5rem] bg-stone-100 text-6xl text-stone-600 dark:bg-stone-900 dark:text-stone-300">
              {chair.emoji}
            </div>
          )}

          <div className="grid gap-2 rounded-3xl bg-stone-950/95 p-5 text-white shadow-lg shadow-stone-950/30 dark:bg-stone-900">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-900 dark:bg-amber-200/10 dark:text-amber-200">
                {chair.mood}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
                {chair.owner}
              </span>
            </div>
            <p className="text-sm font-bold text-stone-200">{chair.decree}</p>
            <p className="text-sm leading-7 text-stone-300">{chair.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
