import { useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, SunDim } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/cn";

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme(),
    buttonRef = useRef(null),
    handleToggle = async () => {
      if (buttonRef.current) {
        if (!document.startViewTransition) {
          toggleTheme();
          return;
        }
        try {
          await document.startViewTransition(() => {
            flushSync(() => {
              toggleTheme();
            });
          }).ready;
          const { top, left, width, height } = buttonRef.current.getBoundingClientRect(),
            centerY = top + height / 2,
            centerX = left + width / 2,
            distanceRight = window.innerWidth - left,
            distanceBottom = window.innerHeight - top,
            radius = Math.hypot(Math.max(left, distanceRight), Math.max(top, distanceBottom));
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${centerX}px ${centerY}px)`,
                `circle(${radius}px at ${centerX}px ${centerY}px)`,
              ],
            },
            {
              duration: 1200,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        } catch (error) {
          console.warn("View transition failed, falling back to simple toggle:", error);
          toggleTheme();
        }
      }
    };
  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className={cn(
        "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center group relative",
        className,
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <SunDim className="w-5 h-5 text-amber-500 transition-all duration-300" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 transition-all duration-300" />
      )}
    </button>
  );
};

export function CompactThemeToggle() {
  return (
    <ThemeToggle className="nav-item-compact w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-gray-700/30 md:bg-transparent md:dark:bg-transparent" />
  );
}
