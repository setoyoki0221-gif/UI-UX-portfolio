import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/hooks/useTheme";

export function PageLoader({ onComplete }) {
  const { language } = useLanguage(),
    { theme } = useTheme(),
    [isLeaving, setIsLeaving] = useState(false);
  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), 2100),
      completeTimer = window.setTimeout(onComplete, 2500);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);
  const isJapanese = language === "ja",
    portraitSrc = theme === "dark" ? "/img/me-dark.jpg" : "/img/me.png";
  return (
    <div
      className={`portfolio-loader ${theme === "dark" ? "portfolio-loader-dark" : "portfolio-loader-light"} ${isLeaving ? "portfolio-loader-leaving" : ""}`}
      aria-label={isJapanese ? "ポートフォリオを読み込み中" : "Loading portfolio"}
      role="status"
    >
      <div className="portfolio-loader-grid" />
      <div className="portfolio-loader-orbit portfolio-loader-orbit-one" />
      <div className="portfolio-loader-orbit portfolio-loader-orbit-two" />
      <div className="portfolio-loader-content">
        <div className="portfolio-loader-topline">
          <span>SC / 01</span>
          <span>{isJapanese ? "横浜 · 日本" : "Yokohama · Japan"}</span>
        </div>
        <div className="portfolio-loader-portrait-wrap">
          <div className="portfolio-loader-ring portfolio-loader-ring-outer" />
          <div className="portfolio-loader-ring portfolio-loader-ring-inner" />
          <div className="portfolio-loader-portrait-glow" />
          <img src={portraitSrc} alt="Shinobi Coder" className="portfolio-loader-portrait" />
          <div className="portfolio-loader-index">01</div>
        </div>
        <div className="portfolio-loader-copy">
          <p className="portfolio-loader-kicker">
            {isJapanese ? "AI · フルスタックエンジニア" : "AI · FULL-STACK ENGINEER"}
          </p>
          <h1>Shinobi Coder</h1>
          <div className="portfolio-loader-status">
            <span className="portfolio-loader-pulse" />
            <span>{isJapanese ? "ポートフォリオを読み込み中" : "Loading portfolio"}</span>
            <ArrowUpRight size={15} />
          </div>
        </div>
        <div className="portfolio-loader-progress">
          <span>{isJapanese ? "体験を準備しています" : "Preparing the experience"}</span>
          <span>{isJapanese ? "日本語" : "EN"}</span>
          <div className="portfolio-loader-progress-track">
            <div className="portfolio-loader-progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
