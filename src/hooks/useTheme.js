import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window < "u") {
      const storedTheme = window.localStorage.getItem("theme");
      return storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
    return "dark";
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    const themeColor = theme === "dark" ? "#000000" : "#ffffff";
    let themeMeta = document.querySelector('meta[name="theme-color"]');
    themeMeta
      ? themeMeta.setAttribute("content", themeColor)
      : ((themeMeta = document.createElement("meta")),
        themeMeta.setAttribute("name", "theme-color"),
        themeMeta.setAttribute("content", themeColor),
        document.head.appendChild(themeMeta));
    let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    statusBarMeta &&
      statusBarMeta.setAttribute("content", theme === "dark" ? "black-translucent" : "default");
    document.documentElement.style.setProperty("--theme-color", themeColor);
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      const viewportContent = viewportMeta.getAttribute("content");
      viewportContent &&
        !viewportContent.includes("viewport-fit=cover") &&
        viewportMeta.setAttribute("content", viewportContent + ", viewport-fit=cover");
    }
  }, [theme]);
  return {
    theme: theme,
    toggleTheme: () => {
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    },
  };
}
