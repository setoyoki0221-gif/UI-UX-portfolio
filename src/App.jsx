import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { DockNavigation } from "@/components/layout/DockNavigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PhoneModal } from "@/components/phone/PhoneModal";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ClickRipple } from "@/components/ui/ClickRipple";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageLoader } from "@/components/ui/PageLoader";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LanguageProvider } from "@/context/LanguageContext";
import { useTheme } from "@/hooks/useTheme";
import { AllProjects } from "@/pages/AllProjects";
import { Home } from "@/pages/Home";

export const App = () => {
  const { theme } = useTheme(),
    [isSearchOpen, setIsSearchOpen] = useState(false),
    [isPhoneOpen, setIsPhoneOpen] = useState(false),
    [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleKeyDown = (event) => {
      (event.ctrlKey || event.metaKey) &&
        event.key === "k" &&
        (event.preventDefault(), setIsSearchOpen(true));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    const themeColor = theme === "dark" ? "#000000" : "#ffffff",
      metaTag = document.querySelector('meta[name="theme-color"]');
    metaTag && metaTag.setAttribute("content", themeColor);
  }, [theme]);
  useEffect(() => {
    const body = document.body,
      root = document.documentElement;
    if (isPhoneOpen) {
      body.style.setProperty("cursor", "auto", "important");
      root.style.setProperty("cursor", "auto", "important");
      return;
    }
    body.style.setProperty("cursor", "none", "important");
    root.style.setProperty("cursor", "none", "important");
  }, [isPhoneOpen]);
  const handleLoaderComplete = () => setIsLoading(false);
  return (
    <LanguageProvider>
      <BrowserRouter>
        {isLoading && <PageLoader onComplete={handleLoaderComplete} />}
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200 relative overflow-x-hidden w-full max-w-full">
          <ParticleBackground />
          <div className="relative z-10">
            <Analytics />
            <>
              <CustomCursor enabled={!isPhoneOpen} />
              <ClickRipple />
              <ScrollProgress />
              <Header onOpenPhone={() => setIsPhoneOpen(true)} />
              <DockNavigation
                className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
                onOpenSearch={() => setIsSearchOpen(true)}
                onOpenPhone={() => setIsPhoneOpen(true)}
              />
              <ChatWidget onOpenPhone={() => setIsPhoneOpen(true)} />
              <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
              {isPhoneOpen && <PhoneModal onClose={() => setIsPhoneOpen(false)} />}
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/all-projects" element={<AllProjects />} />
                </Routes>
              </main>
              <Footer />
            </>
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};
