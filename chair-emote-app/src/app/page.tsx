"use client";

import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  const decreeOfTheDay = {
    title: "Council Chair",
    decree:
      "By unanimous nodding of the Council, this chair is authorized for all important deliberations.",
    emoji: "🏛️",
  };

  const recentMotions = [
    "Motion: Chair (Original Form) acknowledged as foundational entity",
    "Motion: Dad Chair approved for nap-related governance",
    "Motion: Rainbow Chair designated morale support object",
    "Incident Report: Kiddy Chair airborne event logged and archived",
  ];

  return (
    <main className="min-h-screen p-10 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">

      {/* Theme Toggle (global control) */}
      <ThemeToggle />

      <div className="mx-auto max-w-4xl">

        {/* Council Header */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold tracking-wide">
            🏛️ The Chair Council
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
            Proceedings, decrees, and sanctioned chair activity.
          </p>
        </header>

        {/* Decree of the Day */}
        <section className="mb-10 border rounded-xl p-8 bg-white dark:bg-neutral-900 shadow-sm dark:border-neutral-800">
          <h2 className="text-2xl font-semibold mb-6">
            📜 Decree of the Day
          </h2>

          <div className="text-center">
            <div className="text-6xl mb-4">
              {decreeOfTheDay.emoji}
            </div>

            <h3 className="text-2xl font-bold">
              {decreeOfTheDay.title}
            </h3>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              {decreeOfTheDay.decree}
            </p>

            <button className="mt-6 px-5 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
              Enter Chamber
            </button>
          </div>
        </section>

        {/* Council Log */}
        <section className="border rounded-xl p-8 bg-white dark:bg-neutral-900 shadow-sm dark:border-neutral-800">
          <h2 className="text-2xl font-semibold mb-6">
            📂 Council Log
          </h2>

          <div className="space-y-3">
            {recentMotions.map((motion, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
              >
                🪑 {motion}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          All chair activity is monitored under Council Regulation 7.🪑
        </footer>

      </div>
    </main>
  );
}