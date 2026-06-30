"use client";

import { useMemo, useSyncExternalStore } from "react";

const FAVORITES_KEY = "council-chair-favorites";
const FAVORITES_EVENT = "council-chair-favorites-change";

let cachedFavoriteIds: string[] | null = null;

function readStoredFavorites() {
  if (typeof window === "undefined") return [];
  if (cachedFavoriteIds) return cachedFavoriteIds;

  const saved = window.localStorage.getItem(FAVORITES_KEY);
  if (!saved) {
    cachedFavoriteIds = [];
    return cachedFavoriteIds;
  }

  try {
    const parsed = JSON.parse(saved);
    cachedFavoriteIds = Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string")
      : [];
  } catch {
    cachedFavoriteIds = [];
  }

  return cachedFavoriteIds;
}

function writeStoredFavorites(favoriteIds: string[]) {
  cachedFavoriteIds = favoriteIds;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

function subscribeToFavorites(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== FAVORITES_KEY) return;
    cachedFavoriteIds = null;
    onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(FAVORITES_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(FAVORITES_EVENT, onStoreChange);
  };
}

const serverFavoriteIds: string[] = [];

export function useFavorites() {
  const favoriteIds = useSyncExternalStore(
    subscribeToFavorites,
    readStoredFavorites,
    () => serverFavoriteIds,
  );

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = (id: string) => {
    const current = readStoredFavorites();
    writeStoredFavorites(
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  const isFavorite = (id: string) => favoriteSet.has(id);

  return { favoriteIds, isFavorite, toggleFavorite };
}
