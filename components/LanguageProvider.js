"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Japanese is the default on first visit.
  const [lang, setLang] = useState("ja");

  // Restore a previously chosen preference (the EN/日 toggle persists).
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem("dc-lang") : null;
    if (saved === "en" || saved === "ja") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      window.localStorage.setItem("dc-lang", lang);
    }
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((l) => (l === "en" ? "ja" : "en"));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/**
 * Pick a localized value. Accepts either { en, ja } objects or a plain value.
 * Adds a JP-friendly font class when Japanese is active.
 */
export function useT() {
  const { lang } = useLang();
  const t = useCallback(
    (entry) => {
      if (entry && typeof entry === "object" && ("en" in entry || "ja" in entry)) {
        return entry[lang] ?? entry.en ?? "";
      }
      return entry;
    },
    [lang]
  );
  return { t, lang };
}
