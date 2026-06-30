"use client";

import { useCallback, useEffect, useState } from "react";

type AuthUser = {
  id: string;
  email: string;
};

type AuthResponse = {
  id: string;
  email: string;
} | null;

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      const data = (await response.json()) as AuthResponse;
      setUser(data ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to sign in");
        return false;
      }

      setUser(data as AuthUser);
      return true;
    } catch {
      setError("Network error while signing in");
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to register");
        return false;
      }

      setUser(data as AuthUser);
      return true;
    } catch {
      setError("Network error while registering");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      setError(null);
      try {
        const response = await fetch("/api/auth/change-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error ?? "Unable to change password");
          return false;
        }

        return true;
      } catch {
        setError("Network error while changing password");
        return false;
      }
    },
    [],
  );

  const changeEmail = useCallback(async (newEmail: string) => {
    setError(null);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to change email");
        return false;
      }

      setUser(data as AuthUser);
      return true;
    } catch {
      setError("Network error while changing email");
      return false;
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Unable to delete account");
        return false;
      }

      setUser(null);
      return true;
    } catch {
      setError("Network error while deleting account");
      return false;
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    changePassword,
    changeEmail,
    deleteAccount,
    fetchUser,
    setError,
  };
}
