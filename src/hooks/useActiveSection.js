import { useEffect, useState } from "react";

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "education", "projects", "contact"],
      updateActiveSection = () => {
        const scrollY = window.scrollY,
          viewportHeight = window.innerHeight,
          documentHeight = document.documentElement.scrollHeight;
        if (scrollY < 50) {
          setActiveSection("home");
          return;
        }
        if (scrollY + viewportHeight >= documentHeight - 50) {
          setActiveSection("contact");
          return;
        }
        let current = "home",
          bestScore = -1;
        sectionIds.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect(),
              top = rect.top,
              height = rect.height,
              sectionCenter = top + height / 2,
              viewportCenter = viewportHeight / 2,
              hiddenAbove = Math.max(0, -top),
              visibleBottom = Math.min(height, viewportHeight - top),
              visibleHeight = Math.max(0, visibleBottom - hiddenAbove),
              centerDistance = Math.abs(sectionCenter - viewportCenter),
              centerScore = Math.max(0, viewportHeight - centerDistance) / viewportHeight,
              score = (visibleHeight / height) * 0.7 + centerScore * 0.3;
            score > bestScore && visibleHeight > 20 && ((bestScore = score), (current = sectionId));
          }
        });
        setActiveSection(current);
      };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);
  return activeSection;
};
