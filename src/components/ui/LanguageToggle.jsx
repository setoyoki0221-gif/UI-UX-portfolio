import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle({ className = "" }) {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className={`nav-item-compact w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-gray-700/30 md:bg-transparent md:dark:bg-transparent text-xs font-bold ${className}`}
    >
      {language === "ja" ? "JP" : "EN"}
    </button>
  );
}
