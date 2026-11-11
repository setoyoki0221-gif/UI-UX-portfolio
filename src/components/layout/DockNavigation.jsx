import { useEffect, useState } from "react";
import {
  Briefcase,
  FolderKanban,
  Home,
  Maximize,
  Minimize,
  Phone,
  Rocket,
  Search,
  User,
  Wrench,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/Dock";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useActiveSection } from "@/hooks/useActiveSection";

export function DockNavigation({ className, onOpenSearch, onOpenPhone }) {
  const activeSection = useActiveSection(),
    { t } = useLanguage(),
    [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ),
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    const handleKeyDown = (event) => {
      (event.ctrlKey || event.metaKey) &&
        event.key === "k" &&
        (event.preventDefault(), onOpenSearch == null || onOpenSearch());
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenSearch]);
  const toggleFullscreen = async () => {
      try {
        isFullscreen
          ? document.exitFullscreen
            ? await document.exitFullscreen()
            : document.webkitExitFullscreen
              ? await document.webkitExitFullscreen()
              : document.mozCancelFullScreen
                ? await document.mozCancelFullScreen()
                : document.msExitFullscreen && (await document.msExitFullscreen())
          : document.documentElement.requestFullscreen
            ? await document.documentElement.requestFullscreen()
            : document.documentElement.webkitRequestFullscreen
              ? await document.documentElement.webkitRequestFullscreen()
              : document.documentElement.mozRequestFullScreen
                ? await document.documentElement.mozRequestFullScreen()
                : document.documentElement.msRequestFullscreen &&
                  (await document.documentElement.msRequestFullscreen());
      } catch (error) {
        console.error("Error toggling fullscreen:", error);
      }
    },
    scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      element &&
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    },
    navItems = [
      {
        id: "home",
        icon: Home,
        label: t.nav.home,
        onClick: () => scrollToSection("home"),
      },
      {
        id: "about",
        icon: User,
        label: t.nav.about,
        onClick: () => scrollToSection("about"),
      },
      {
        id: "skills",
        icon: Wrench,
        label: t.nav.skills,
        onClick: () => scrollToSection("skills"),
      },
      {
        id: "education",
        icon: Briefcase,
        label: t.nav.experience,
        onClick: () => scrollToSection("education"),
      },
      {
        id: "projects",
        icon: FolderKanban,
        label: t.nav.projects,
        onClick: () => scrollToSection("projects"),
      },
      {
        id: "contact",
        icon: Rocket,
        label: t.nav.contact,
        onClick: () => scrollToSection("contact"),
      },
    ];
  return (
    <div
      className={`${className}`}
      style={{
        overflow: "visible",
      }}
    >
      <Dock direction="middle" iconSize={42} iconMagnification={56} iconDistance={140}>
        <DockIcon tooltip="Open phone portfolio" className="nav-item-compact" onClick={onOpenPhone}>
          <Phone className="w-5 h-5" />
        </DockIcon>
        {navItems.map(({ id, icon: Icon, label, onClick }) => (
          <DockIcon
            tooltip={label}
            className={
              activeSection === id
                ? "nav-item-compact bg-gradient-to-r from-green-500/20 to-yellow-500/20 hover:from-green-500/30 hover:to-yellow-500/30 border border-green-500/25 dark:border-green-500/35"
                : "nav-item-compact"
            }
            onClick={onClick}
            key={id}
          >
            <Icon className="w-5 h-5" />
          </DockIcon>
        ))}
        <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 self-center mx-1" />
        <DockIcon tooltip="Toggle Theme" className="nav-item-compact p-0" onClick={() => {}}>
          <ThemeToggle className="w-full h-full p-0 rounded-full hover:bg-transparent dark:hover:bg-transparent" />
        </DockIcon>
        <DockIcon tooltip="JP / EN" className="nav-item-compact p-0" onClick={() => {}}>
          <LanguageToggle className="w-full h-full rounded-full" />
        </DockIcon>
        <DockIcon
          tooltip={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="nav-item-compact"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-gray-900 dark:text-white transition-all duration-300" />
          ) : (
            <Maximize className="w-5 h-5 text-gray-900 dark:text-white transition-all duration-300" />
          )}
        </DockIcon>
        <div className="w-px h-6 bg-gray-300/50 dark:bg-gray-600/50 self-center mx-1" />
        <DockIcon
          tooltip="Search Portfolio (⌘K)"
          className="nav-item-compact"
          onClick={() => (onOpenSearch == null ? void 0 : onOpenSearch())}
          data-search-button="true"
        >
          <Search className="w-5 h-5" />
        </DockIcon>
      </Dock>
    </div>
  );
}
