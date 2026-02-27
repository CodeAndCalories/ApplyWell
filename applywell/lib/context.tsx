"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { AppState, DEFAULT_STATE, Entry, StudentProfile } from "@/lib/types";
import { loadState, saveState, clearState } from "@/lib/storage/localStorage";

interface AppContextValue {
  state: AppState;
  updateProfile: (profile: StudentProfile) => void;
  saveEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => void;
  verifyEntry: (id: string, verified: boolean) => void;
  loadDemo: () => Promise<void>;
  deleteAllData: () => void;
  isSaved: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isSaved, setIsSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
    setIsSaved(true);
    const t = setTimeout(() => setIsSaved(false), 1500);
    return () => clearTimeout(t);
  }, [state, hydrated]);

  const updateProfile = useCallback((profile: StudentProfile) => {
    setState((s) => ({ ...s, profile }));
  }, []);

  const saveEntry = useCallback((entry: Entry) => {
    setState((s) => ({
      ...s,
      entries: s.entries.find((e) => e.id === entry.id)
        ? s.entries.map((e) => (e.id === entry.id ? entry : e))
        : [...s.entries, entry],
    }));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setState((s) => ({ ...s, entries: s.entries.filter((e) => e.id !== id) }));
  }, []);

  const verifyEntry = useCallback((id: string, verified: boolean) => {
    setState((s) => ({
      ...s,
      entries: s.entries.map((e) => (e.id === id ? { ...e, verified } : e)),
    }));
  }, []);

  const loadDemo = useCallback(async () => {
    const res = await fetch("/demo-data.json");
    const data = await res.json();
    setState({ ...DEFAULT_STATE, ...data });
  }, []);

  const deleteAllData = useCallback(() => {
    clearState();
    setState(DEFAULT_STATE);
  }, []);

  return (
    <AppContext.Provider value={{
      state, updateProfile, saveEntry, deleteEntry,
      verifyEntry, loadDemo, deleteAllData, isSaved,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
