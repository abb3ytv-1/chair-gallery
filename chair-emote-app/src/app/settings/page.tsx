"use client";

import { MobileShell } from "../../components/MobileShell";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <MobileShell title="Council Settings" eyebrow="Prefs">
      <div className="space-y-4">
        <section>
          <h1 className="text-3xl font-black leading-tight">Preferences</h1>
          <p className="mt-2 text-[15px] leading-7 text-stone-600 dark:text-stone-300">
            Keep the chamber comfortable for quick phone checks and late-night
            chair audits.
          </p>
        </section>

        <section className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-black">Color mode</h2>
              <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
                Current mode: {theme}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        <section className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <h2 className="font-black">Mobile install</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
            The app is set up with mobile metadata and safe-area spacing, ready
            for a PWA manifest/icon pass next.
          </p>
        </section>
      </div>
    </MobileShell>
  );
}
