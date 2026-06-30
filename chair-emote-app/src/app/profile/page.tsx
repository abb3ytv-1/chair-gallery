"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ChairCard } from "../../components/ChairCard";
import { MobileShell } from "../../components/MobileShell";
import { chairs } from "../../data/chairs";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();

    const favoriteChairs = useMemo(
        () => chairs.filter((chair) => favoriteIds.includes(chair.id)),
        [favoriteIds],
    );

    return (
        <MobileShell title="Profile" eyebrow="Account">
        <div className="space-y-6">
            <section>
            <h1 className="text-3xl font-black leading-tight">Your profile</h1>
            <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
                Keep your favorite chairs synced and access your saved archive from any device.
            </p>
            </section>

            {loading ? (
            <section className="rounded-3xl border border-stone-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
                <p className="text-sm text-stone-500 dark:text-stone-400">Loading account…</p>
            </section>
            ) : user ? (
            <section className="space-y-4 rounded-3xl border border-stone-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10">
                <div className="flex flex-col gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                    Signed in as
                    </p>
                    <p className="mt-2 text-xl font-black">{user.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-[#f3eadc] p-4 text-sm font-black text-stone-950 dark:bg-white/10 dark:text-white">
                    <div className="text-3xl">{favoriteChairs.length}</div>
                    <div className="mt-1 text-xs font-semibold text-stone-500 dark:text-stone-300">
                        Saved chairs
                    </div>
                    </div>
                    <button
                    type="button"
                    onClick={logout}
                    className="rounded-3xl bg-stone-950 px-4 py-4 text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
                    >
                    Sign out
                    </button>
                </div>
                </div>
            </section>
            ) : (
            <section className="rounded-3xl border border-stone-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
                <p className="text-sm text-stone-600 dark:text-stone-300">
                You are currently browsing as a guest. Sign in to keep your chairs synced across devices.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                    href="/auth/login"
                    className="rounded-3xl bg-stone-950 px-4 py-3 text-center text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
                >
                    Sign in
                </Link>
                <Link
                    href="/auth/register"
                    className="rounded-3xl border border-stone-900/10 px-4 py-3 text-center text-sm font-bold text-stone-950 transition active:scale-[0.98] dark:border-white/10 dark:text-white"
                >
                    Create account
                </Link>
                </div>
            </section>
            )}

            <section className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                    Saved archive
                </p>
                <h2 className="mt-2 text-xl font-black">Your favorite chairs</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200">
                {favoriteChairs.length} saved
                </span>
            </div>

            {favoriteChairs.length > 0 ? (
                <div className="space-y-3">
                {favoriteChairs.map((chair) => (
                    <ChairCard
                    key={chair.id}
                    chair={chair}
                    favorite={isFavorite(chair.id)}
                    onToggleFavorite={toggleFavorite}
                    />
                ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-stone-900/20 p-6 text-center dark:border-white/20">
                <p className="text-lg font-black">No saved chairs yet</p>
                <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">
                    Star a chair in the archive and it will appear here.
                </p>
                </div>
            )}
            </section>
        </div>
        </MobileShell>
    );
}
