import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] px-6 py-10 text-stone-950 dark:bg-[#11100f] dark:text-stone-50">
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-900/10 bg-white/75 p-8 shadow-sm dark:border-white/10 dark:bg-white/10">
        <Link href="/" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Back to council
        </Link>
        <h1 className="mt-6 text-4xl font-black">Council Settings</h1>
        <p className="mt-4 leading-7 text-stone-700 dark:text-stone-300">
          Preferences and archive controls can be added here when the council is
          ready for more knobs.
        </p>
      </div>
    </main>
  );
}
