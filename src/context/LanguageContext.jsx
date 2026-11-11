import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext(void 0);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window < "u") {
      const storedLanguage = window.localStorage.getItem("language");
      if (storedLanguage === "en" || storedLanguage === "ja") return storedLanguage;
    }
    return "ja";
  });
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);
  const contextValue = {
    language: language,
    toggleLanguage: () => setLanguage((prevLanguage) => (prevLanguage === "ja" ? "en" : "ja")),
    setLanguage: (newLanguage) => setLanguage(newLanguage),
    t: translations[language],
  };
  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
