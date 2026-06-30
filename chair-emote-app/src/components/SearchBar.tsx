"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="block">
      <span className="sr-only">Search chairs</span>
      <div className="flex h-12 items-center gap-3 rounded-2xl border border-stone-900/10 bg-white px-4 shadow-sm dark:border-white/10 dark:bg-white/10">
        <span aria-hidden="true" className="text-stone-400">
          ⌕
        </span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search the archive"
          className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-stone-400"
          type="search"
        />
      </div>
    </label>
  );
}
