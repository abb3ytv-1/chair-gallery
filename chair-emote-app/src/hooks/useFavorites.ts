"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const FAVORITES_API = "/api/favorites";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch(FAVORITES_API)
      .then((response) => response.json())
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data)) {
          setFavoriteIds(data.filter((id) => typeof id === "string"));
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setFavoriteIds([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleFavorite = useCallback(async (id: string) => {
    setFavoriteIds((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );

    try {
      const response = await fetch(FAVORITES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chairId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setFavoriteIds(data.filter((favoriteId) => typeof favoriteId === "string"));
        }
      }
    } catch {
      // keep optimistic UI state if the request fails
    }
  }, []);

  const isFavorite = useCallback((id: string) => favoriteSet.has(id), [favoriteSet]);

  return { favoriteIds, isFavorite, toggleFavorite };
}
