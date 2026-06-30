"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const tabs = [
  { label: "Home", href: "/", icon: "⌂" },
  { label: "Chairs", href: "/chairs", icon: "▦" },
  { label: "Saved", href: "/favorites", icon: "★" },
  { label: "Prefs", href: "/settings", icon: "⚙" },
];

type MobileShellProps = {
  children: React.ReactNode;
  title?: string;
  eyebrow?: string;
};

export function MobileShell({
  children,
  title = "Chair Chamber",
  eyebrow = "Council",
}: MobileShellProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f3eadc] text-stone-950 transition-colors dark:bg-[#0f1110] dark:text-stone-50">
      <div className="mx-auto min-h-screen w-full max-w-md bg-[#f8f3ea] shadow-2xl shadow-stone-950/10 dark:bg-[#151716] sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:overflow-hidden sm:rounded-[2rem]">
        <div className="sticky top-0 z-20 border-b border-stone-900/10 bg-[#f8f3ea]/90 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur dark:border-white/10 dark:bg-[#151716]/90">
          <header className="flex items-center justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#b73f32] text-lg font-black text-white shadow-lg shadow-red-950/15">
                🪑
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
                  {eyebrow}
                </span>
                <span className="block truncate text-lg font-black">{title}</span>
              </span>
            </Link>

            <ThemeToggle />
          </header>
        </div>

        <div className="px-4 pb-28 pt-4">{children}</div>

        <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-md border-t border-stone-900/10 bg-[#f8f3ea]/95 px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur dark:border-white/10 dark:bg-[#151716]/95 sm:bottom-6 sm:rounded-b-[2rem]">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map((tab) => {
              const active =
                tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-bold transition active:scale-[0.97] ${
                    active
                      ? "bg-stone-950 text-white dark:bg-amber-200 dark:text-stone-950"
                      : "text-stone-500 active:bg-stone-900/5 dark:text-stone-400 dark:active:bg-white/10"
                  }`}
                >
                  <span className="text-base leading-none">{tab.icon}</span>
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </main>
  );
}
