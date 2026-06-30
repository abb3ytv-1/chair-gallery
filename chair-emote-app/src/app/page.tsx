"use client";

import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

const councilStats = [
  { label: "Motions", value: "18" },
  { label: "Seated", value: "42" },
  { label: "Nods", value: "97%" },
];

const quickActions = [
  { label: "Chairs", href: "/chairs", icon: "C" },
  { label: "Favorites", href: "/favorites", icon: "F" },
  { label: "Settings", href: "/settings", icon: "S" },
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

const bottomTabs = [
  { label: "Home", href: "/", icon: "H", active: true },
  { label: "Chairs", href: "/chairs", icon: "C" },
  { label: "Saved", href: "/favorites", icon: "F" },
  { label: "Prefs", href: "/settings", icon: "P" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3eadc] text-stone-950 transition-colors dark:bg-[#0f1110] dark:text-stone-50">
      <div className="mx-auto min-h-screen w-full max-w-md bg-[#f8f3ea] shadow-2xl shadow-stone-950/10 dark:bg-[#151716] sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:overflow-hidden sm:rounded-[2rem]">
        <div className="sticky top-0 z-20 border-b border-stone-900/10 bg-[#f8f3ea]/90 px-4 pb-3 pt-4 backdrop-blur dark:border-white/10 dark:bg-[#151716]/90">
          <header className="flex items-center justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#b73f32] text-lg font-black text-white shadow-lg shadow-red-950/15">
                &#x1FA91;
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                  Council
                </span>
                <span className="block truncate text-lg font-black">
                  Chair Chamber
                </span>
              </span>
            </Link>

            <ThemeToggle />
          </header>
        </div>

        <div className="space-y-5 px-4 pb-28 pt-4">
          <section className="rounded-[1.75rem] bg-stone-950 p-5 text-white shadow-xl shadow-stone-950/15 dark:bg-black">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                  Decree Today
                </p>
                <h1 className="mt-2 text-3xl font-black leading-tight">
                  Council Chair
                </h1>
              </div>
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-amber-200 text-3xl text-stone-950">
                &#x1F3DB;&#xFE0F;
              </div>
            </div>

            <p className="mt-4 text-[15px] leading-7 text-stone-300">
              Authorized for all important deliberations by unanimous nodding of
              the Council.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {councilStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-3">
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="mt-0.5 text-[11px] font-semibold text-stone-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
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
                  <span className="grid size-9 place-items-center rounded-2xl bg-[#237065] text-sm font-black text-white dark:bg-emerald-300 dark:text-stone-950">
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
                      &#x1FA91;
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

        <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-stone-900/10 bg-[#f8f3ea]/95 px-3 pb-4 pt-2 backdrop-blur dark:border-white/10 dark:bg-[#151716]/95 sm:bottom-6 sm:rounded-b-[2rem]">
          <div className="grid grid-cols-4 gap-1">
            {bottomTabs.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition active:scale-[0.97] ${
                  tab.active
                    ? "bg-stone-950 text-white dark:bg-amber-200 dark:text-stone-950"
                    : "text-stone-500 active:bg-stone-900/5 dark:text-stone-400 dark:active:bg-white/10"
                }`}
              >
                <span className="text-sm leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
