"use client";

import Link from "next/link";
import { ChairDetail } from "../components/ChairDetail";
import { MobileShell } from "../components/MobileShell";
import { chairs } from "../data/chairs";

const councilStats = [
  { label: "Motions", value: "18" },
  { label: "Seated", value: "10" },
  { label: "Nods", value: "97%" },
];

const quickActions = [
  { label: "Chairs", href: "/chairs", icon: "▦" },
  { label: "Favorites", href: "/favorites", icon: "★" },
  { label: "Settings", href: "/settings", icon: "⚙" },
];

const recentMotions = [
  {
    title: "Foundational Entity",
    detail: "Original Chair acknowledged as first seat of order.",
    status: "Ratified",
    time: "09:14",
  },
  {
    title: "Nap Governance",
    detail: "Dad Chair approved for low-stakes executive resting.",
    status: "Approved",
    time: "10:30",
  },
  {
    title: "Morale Appointment",
    detail: "Rainbow Chair assigned official optimism support.",
    status: "Seated",
    time: "12:05",
  },
  {
    title: "Airborne Event",
    detail: "Kiddy Chair incident logged and archived.",
    status: "Filed",
    time: "14:42",
  },
];

export default function Home() {
  const featuredChair = chairs[0];

  return (
    <MobileShell>
      <div className="space-y-5">
        <ChairDetail chair={featuredChair} />

        <section className="-mt-2 grid grid-cols-3 gap-2 rounded-3xl bg-white p-3 shadow-sm dark:bg-white/10">
          {councilStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-[#f3eadc] p-3 dark:bg-black/25">
              <div className="text-xl font-black">{stat.value}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-stone-500 dark:text-stone-300">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black">Quick actions</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200">
              In session
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex min-h-24 flex-col justify-between rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm transition active:scale-[0.98] dark:border-white/10 dark:bg-white/10"
              >
                <span className="grid size-9 place-items-center rounded-2xl bg-[#237065] text-base font-black text-white dark:bg-emerald-300 dark:text-stone-950">
                  {action.icon}
                </span>
                <span className="text-sm font-bold">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
                Chamber Status
              </p>
              <h2 className="mt-1 text-xl font-black">Quorum reached</h2>
            </div>
            <span className="grid size-11 place-items-center rounded-2xl bg-[#efe3d0] text-lg font-black text-stone-950">
              7
            </span>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {"COUNCIL".split("").map((seat, index) => (
              <div
                key={`${seat}-${index}`}
                className="grid aspect-square place-items-center rounded-xl bg-amber-200 text-xs font-black text-stone-950"
              >
                {seat}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                Council Log
              </p>
              <h2 className="mt-1 text-2xl font-black">Recent motions</h2>
            </div>
            <Link
              href="/chairs"
              className="rounded-full px-3 py-2 text-sm font-bold text-emerald-700 active:bg-emerald-100 dark:text-emerald-300 dark:active:bg-white/10"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentMotions.map((motion) => (
              <article
                key={motion.title}
                className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#b73f32] text-sm font-black text-white">
                    🪑
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-black leading-snug">{motion.title}</h3>
                      <time className="shrink-0 text-xs font-semibold text-stone-400">
                        {motion.time}
                      </time>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
                      {motion.detail}
                    </p>
                    <span className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200">
                      {motion.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}
