import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ml";

export interface Bi {
  en: string;
  ml: string;
}

const STORAGE_KEY = "wafd-lang";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "ml" ? "ml" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "ml" ? "ml" : "en";
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ml" : "en"));

  return <LanguageContext.Provider value={{ lang, toggleLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Pick the string for the current language out of a { en, ml } pair. */
export function useT() {
  const { lang } = useLanguage();
  return (bi: Bi) => bi[lang];
}
