"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../hooks/useAuth";
import { MobileShell } from "../../../components/MobileShell";

export default function LoginPage() {
  const router = useRouter();
  const { login, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError("");

    if (!email.trim()) {
      setClientError("Please enter your email");
      return;
    }
    if (!password) {
      setClientError("Please enter your password");
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    
    if (success) {
      router.push("/profile");
    }
  };

  const error = clientError || authError;

  return (
    <MobileShell title="Sign in" eyebrow="Council">
      <div className="space-y-6">
        <section>
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
            Sign in to keep your saved chairs synced to your account across all devices.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onFocus={() => setClientError("")}
              placeholder="you@example.com"
              required
              className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onFocus={() => setClientError("")}
              placeholder="••••••••"
              required
              className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-stone-500 dark:focus:ring-amber-300/20"
            />
          </label>

          {error && (
            <div className="rounded-3xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-200/10 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] disabled:opacity-50 hover:bg-stone-800 dark:bg-amber-200 dark:text-stone-950 dark:hover:bg-amber-300"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="space-y-3 rounded-3xl border border-stone-900/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Don't have an account? <Link href="/auth/register" className="font-bold text-amber-700 transition hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200">Create one here</Link>.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
