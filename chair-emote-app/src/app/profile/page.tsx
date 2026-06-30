"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChairCard } from "../../components/ChairCard";
import { MobileShell } from "../../components/MobileShell";
import { chairs } from "../../data/chairs";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";

export default function ProfilePage() {
    const { user, loading, logout, changePassword, changeEmail, deleteAccount, error: authError, setError } = useAuth();
    const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState(false);
    
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const favoriteChairs = useMemo(
        () => chairs.filter((chair) => favoriteIds.includes(chair.id)),
        [favoriteIds],
    );

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");
        setPasswordSuccess(false);

        if (!currentPassword) {
            setPasswordError("Please enter your current password");
            return;
        }
        if (!newPassword) {
            setPasswordError("Please enter a new password");
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("New password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordLoading(true);
        const success = await changePassword(currentPassword, newPassword);
        setPasswordLoading(false);

        if (success) {
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setShowPasswordForm(false);
                setPasswordSuccess(false);
            }, 2000);
        }
    };

    const handleEmailChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setEmailSuccess(false);

        if (!newEmail.trim()) {
            setEmailError("Please enter a new email");
            return;
        }
        if (newEmail === user?.email) {
            setEmailError("New email is the same as current email");
            return;
        }

        setEmailLoading(true);
        const success = await changeEmail(newEmail);
        setEmailLoading(false);

        if (success) {
            setEmailSuccess(true);
            setNewEmail("");
            setTimeout(() => {
                setShowEmailForm(false);
                setEmailSuccess(false);
            }, 2000);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleteLoading(true);
        const success = await deleteAccount();
        setDeleteLoading(false);

        if (success) {
            window.location.href = "/";
        }
    };

    return (
        <MobileShell title="Your Account" eyebrow="Profile">
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
            <section className="space-y-4">
                <div className="rounded-3xl border border-stone-900/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/10">
                <div className="flex items-start justify-between gap-4">
                    <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        ✓ Signed in
                    </p>
                    <p className="mt-2 text-xl font-black">{user.email}</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 p-3 text-lg dark:bg-emerald-300/15">
                    👤
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-amber-50 p-4 text-center dark:bg-amber-300/10">
                    <div className="text-3xl font-black">{favoriteChairs.length}</div>
                    <div className="mt-1 text-xs font-semibold text-stone-600 dark:text-stone-300">
                        Saved chairs
                    </div>
                    </div>
                    <button
                    type="button"
                    onClick={logout}
                    className="rounded-3xl bg-stone-950 px-4 py-4 text-sm font-bold text-white transition active:scale-[0.98] hover:bg-stone-800 dark:bg-amber-200 dark:text-stone-950 dark:hover:bg-amber-300"
                    >
                    Sign out
                    </button>
                </div>

                <div className="space-y-2">
                    {!showPasswordForm && (
                        <button
                        type="button"
                        onClick={() => setShowPasswordForm(true)}
                        className="w-full rounded-3xl border border-stone-900/10 px-4 py-3 text-sm font-bold text-stone-950 transition active:scale-[0.98] hover:bg-stone-900/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                        Change password
                        </button>
                    )}

                    {!showEmailForm && (
                        <button
                        type="button"
                        onClick={() => setShowEmailForm(true)}
                        className="w-full rounded-3xl border border-stone-900/10 px-4 py-3 text-sm font-bold text-stone-950 transition active:scale-[0.98] hover:bg-stone-900/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                        >
                        Change email
                        </button>
                    )}

                    {!showDeleteConfirm && (
                        <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full rounded-3xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 transition active:scale-[0.98] hover:bg-red-50 dark:border-red-300/20 dark:text-red-400 dark:hover:bg-red-300/10"
                        >
                        Delete account
                        </button>
                    )}
                </div>

                {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="space-y-3 rounded-3xl border border-stone-900/10 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-bold text-stone-700 dark:text-stone-200">Change your password</h3>
                    
                    <label className="block space-y-1">
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Current password</span>
                        <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        onFocus={() => setPasswordError("")}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">New password</span>
                        <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onFocus={() => setPasswordError("")}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Confirm new password</span>
                        <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setPasswordError("")}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
                        />
                    </label>

                    {passwordError && (
                        <div className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:bg-red-200/10 dark:text-red-200">
                        {passwordError}
                        </div>
                    )}

                    {passwordSuccess && (
                        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-200/10 dark:text-emerald-200">
                        ✓ Password updated successfully
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                        type="submit"
                        disabled={passwordLoading}
                        className="flex-1 rounded-2xl bg-stone-950 px-3 py-2 text-xs font-bold text-white transition active:scale-[0.98] disabled:opacity-50 hover:bg-stone-800 dark:bg-amber-200 dark:text-stone-950 dark:hover:bg-amber-300"
                        >
                        {passwordLoading ? "Updating…" : "Update password"}
                        </button>
                        <button
                        type="button"
                        onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordError("");
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                        }}
                        className="flex-1 rounded-2xl border border-stone-900/10 px-3 py-2 text-xs font-bold text-stone-600 transition active:scale-[0.98] hover:bg-stone-900/5 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/5"
                        >
                        Cancel
                        </button>
                    </div>
                    </form>
                )}

                {showEmailForm && (
                    <form onSubmit={handleEmailChange} className="space-y-3 rounded-3xl border border-stone-900/10 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <h3 className="text-sm font-bold text-stone-700 dark:text-stone-200">Change your email</h3>
                    
                    <label className="block space-y-1">
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">Current email</span>
                        <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full rounded-2xl border border-stone-300 bg-stone-100 px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-stone-400"
                        />
                    </label>

                    <label className="block space-y-1">
                        <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">New email</span>
                        <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        onFocus={() => setEmailError("")}
                        placeholder="new@example.com"
                        className="w-full rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
                        />
                    </label>

                    {emailError && (
                        <div className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:bg-red-200/10 dark:text-red-200">
                        {emailError}
                        </div>
                    )}

                    {emailSuccess && (
                        <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-200/10 dark:text-emerald-200">
                        ✓ Email updated successfully
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                        type="submit"
                        disabled={emailLoading}
                        className="flex-1 rounded-2xl bg-stone-950 px-3 py-2 text-xs font-bold text-white transition active:scale-[0.98] disabled:opacity-50 hover:bg-stone-800 dark:bg-amber-200 dark:text-stone-950 dark:hover:bg-amber-300"
                        >
                        {emailLoading ? "Updating…" : "Update email"}
                        </button>
                        <button
                        type="button"
                        onClick={() => {
                            setShowEmailForm(false);
                            setEmailError("");
                            setNewEmail("");
                        }}
                        className="flex-1 rounded-2xl border border-stone-900/10 px-3 py-2 text-xs font-bold text-stone-600 transition active:scale-[0.98] hover:bg-stone-900/5 dark:border-white/10 dark:text-stone-300 dark:hover:bg-white/5"
                        >
                        Cancel
                        </button>
                    </div>
                    </form>
                )}

                {showDeleteConfirm && (
                    <div className="space-y-3 rounded-3xl border border-red-200 bg-red-50 p-4 dark:border-red-300/20 dark:bg-red-300/10">
                    <h3 className="text-sm font-bold text-red-700 dark:text-red-400">Delete account?</h3>
                    <p className="text-xs text-red-600 dark:text-red-300">
                        This will permanently delete your account, all saved chairs, and cannot be undone.
                    </p>
                    <div className="flex gap-2">
                        <button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading}
                        className="flex-1 rounded-2xl bg-red-600 px-3 py-2 text-xs font-bold text-white transition active:scale-[0.98] disabled:opacity-50 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                        >
                        {deleteLoading ? "Deleting…" : "Yes, delete"}
                        </button>
                        <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 rounded-2xl border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition active:scale-[0.98] hover:bg-red-100 dark:border-red-300/20 dark:text-red-400 dark:hover:bg-red-300/10"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                )}
            </section>
            ) : (
            <section className="rounded-3xl border border-stone-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/10">
                <div className="flex items-start gap-4">
                    <div className="text-3xl">🔓</div>
                    <div>
                    <p className="font-bold text-stone-900 dark:text-white">Not signed in</p>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-300">
                        Sign in to keep your chairs synced across devices and access them anywhere.
                    </p>
                    </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                    href="/auth/login"
                    className="rounded-3xl bg-stone-950 px-4 py-3 text-center text-sm font-bold text-white transition active:scale-[0.98] hover:bg-stone-800 dark:bg-amber-200 dark:text-stone-950 dark:hover:bg-amber-300"
                >
                    Sign in
                </Link>
                <Link
                    href="/auth/register"
                    className="rounded-3xl border border-stone-900/10 px-4 py-3 text-center text-sm font-bold text-stone-950 transition active:scale-[0.98] hover:bg-stone-900/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
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
                    Archive
                </p>
                <h2 className="mt-2 text-xl font-black">Saved chairs</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200">
                {favoriteChairs.length}
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
