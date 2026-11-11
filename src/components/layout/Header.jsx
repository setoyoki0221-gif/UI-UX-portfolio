import { useEffect, useState } from "react";
import {
  Briefcase,
  FolderKanban,
  Home,
  Mail,
  Phone,
  User,
  Wrench,
  X as CloseIcon,
} from "lucide-react";
import { NavLink } from "@/components/layout/NavLink";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { CompactThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Header({ onOpenPhone }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false),
    activeSection = useActiveSection(),
    { t } = useLanguage(),
    toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  useEffect(
    () => (
      isMenuOpen ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset"),
      () => {
        document.body.style.overflow = "unset";
      }
    ),
    [isMenuOpen],
  );
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 p-4 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 transition-all md:hidden">
        <div className="container mx-auto max-w-7xl flex justify-between items-center px-4 relative">
          <div className="text-lg font-bold dark:text-gray-100">
            <ShimmerText
              className="text-2xl sm:text-3xl"
              style={{
                fontFamily: "'Qwitcher Grypen', cursive",
              }}
              duration={3}
            >
              Shinobi Coder
            </ShimmerText>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <CompactThemeToggle />
            <button
              type="button"
              onClick={onOpenPhone}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 p-2.5 transition-all hover:bg-white/20 dark:bg-gray-700/30 dark:hover:bg-gray-700/50"
              aria-label="Open phone portfolio"
            >
              <Phone className="h-5 w-5 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2.5 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 transition-all duration-300 md:hover:scale-110 md:hover:-translate-y-1 relative z-20 group nav-item-compact w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-gray-700/30 md:bg-transparent md:dark:bg-transparent"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center items-center w-4 h-4">
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm mb-0.5" />
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm mb-0.5" />
                <span className="bg-gray-900 dark:bg-white block h-0.5 w-4 rounded-sm" />
              </div>
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}{" "}
      <div
        className={`fixed top-0 right-0 h-full w-[55%] transform transition-all duration-500 ease-out z-50 shadow-2xl md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {" "}
        <div className="absolute inset-0 bg-white/95 dark:bg-black backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-transparent to-yellow-50/10 dark:from-green-900/10 dark:via-transparent dark:to-yellow-900/5" />
        <div className="relative h-full flex flex-col">
          {" "}
          <div className="relative p-4 border-b border-gray-200/40 dark:border-gray-700/40">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-green-700 dark:from-white dark:to-green-300 bg-clip-text text-transparent">
                  {t.nav.navigation}
                </h3>
              </div>{" "}
              <button
                onClick={toggleMenu}
                className="p-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-yellow-500 rounded-full" />
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.nav.sections}
                  </span>
                </div>{" "}
                <div className="space-y-2">
                  <NavLink
                    href="#home"
                    icon={<Home className="w-4 h-4" />}
                    label={t.nav.home}
                    onClick={toggleMenu}
                    isActive={activeSection === "home"}
                    className="w-full justify-start px-4 py-3"
                  />
                  <NavLink
                    href="#about"
                    icon={<User className="w-4 h-4" />}
                    label={t.nav.about}
                    onClick={toggleMenu}
                    isActive={activeSection === "about"}
                    className="w-full justify-start px-4 py-3"
                  />
                  <NavLink
                    href="#skills"
                    icon={<Wrench className="w-4 h-4" />}
                    label={t.nav.skills}
                    onClick={toggleMenu}
                    isActive={activeSection === "skills"}
                    className="w-full justify-start px-4 py-3"
                  />
                  <NavLink
                    href="#education"
                    icon={<Briefcase className="w-4 h-4" />}
                    label={t.nav.experience}
                    onClick={toggleMenu}
                    isActive={activeSection === "education"}
                    className="w-full justify-start px-4 py-3"
                  />
                  <NavLink
                    href="#projects"
                    icon={<FolderKanban className="w-4 h-4" />}
                    label={t.nav.projects}
                    onClick={toggleMenu}
                    isActive={activeSection === "projects"}
                    className="w-full justify-start px-4 py-3"
                  />
                  <NavLink
                    href="#contact"
                    icon={<Mail className="w-4 h-4" />}
                    label={t.nav.contact}
                    onClick={toggleMenu}
                    isActive={activeSection === "contact"}
                    className="w-full justify-start px-4 py-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
