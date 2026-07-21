import { useLanguage } from "../lib/i18n";

interface LanguageToggleProps {
  dark?: boolean;
  className?: string;
}

export default function LanguageToggle({ dark = false, className = "" }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();
  const nextLabel = lang === "en" ? "മല" : "ENG";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === "en" ? "മലയാളത്തിലേക്ക് മാറുക" : "Switch to English"}
      className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-300 ${
        dark
          ? "border-cream/40 text-cream hover:border-gold hover:text-gold"
          : "border-maroon/30 text-maroon hover:border-gold hover:text-gold-dark"
      } ${className}`}
      style={lang === "en" ? { fontFamily: '"Noto Sans Malayalam", sans-serif' } : undefined}
    >
      {nextLabel}
    </button>
  );
}
