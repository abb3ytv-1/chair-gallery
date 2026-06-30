"use client";

"use client";

import { useMemo } from "react";
import { MobileShell } from "../../components/MobileShell";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

export default function SettingsPage() {
  const { theme } = useTheme();
  const { user, loading, error, logout } = useAuth();

  const authSection = useMemo(() => {
    if (loading) {
      return <p className="text-sm text-stone-500 dark:text-stone-400">Loading account…</p>;
    }

    if (user) {
      return (
        <div className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                Signed in
              </p>
              <p className="mt-2 text-lg font-black">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-3xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
            >
              Sign out
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
        <div className="space-y-3">
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Sign in to keep your saved chairs synced across devices.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="/auth/login"
              className="rounded-3xl bg-stone-950 px-4 py-3 text-center text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
            >
              Sign in
            </a>
            <a
              href="/auth/register"
              className="rounded-3xl border border-stone-900/10 px-4 py-3 text-center text-sm font-bold text-stone-950 transition active:scale-[0.98] dark:border-white/10 dark:text-white"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    );
  }, [loading, user, logout]);

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

        {authSection}

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

        <section className="rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-black">Profile</h2>
              <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-stone-300">
                View your saved chairs and account details.
              </p>
            </div>
            <a
              href="/profile"
              className="rounded-3xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
            >
              Open profile
            </a>
          </div>
        </section>

        {error ? (
          <div className="rounded-3xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-200/10 dark:text-red-200">
            {error}
          </div>
        ) : null}
      </div>
    </MobileShell>
  );
}
