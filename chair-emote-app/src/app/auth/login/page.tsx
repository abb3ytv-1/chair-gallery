"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { MobileShell } from "../../../components/MobileShell";

export default function LoginPage() {
  const router = useRouter();
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push("/");
    }
  };

  return (
    <MobileShell title="Sign in" eyebrow="Council">
      <div className="space-y-6">
        <section>
          <h1 className="text-3xl font-black">Welcome back</h1>
          <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-stone-300">
            Sign in to keep your saved chairs and preferences synced to your account.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-stone-700 dark:text-stone-200">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-200 dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold text-stone-700 dark:text-stone-200">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-3xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-200 dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
          </label>

          {error ? (
            <div className="rounded-3xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-200/10 dark:text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-3xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98] dark:bg-amber-200 dark:text-stone-950"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="rounded-3xl border border-stone-900/10 bg-white p-4 text-sm text-stone-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-stone-300">
          <p>
            New to Council? <a href="/auth/register" className="font-bold text-amber-700 dark:text-amber-300">Create an account</a>.
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
