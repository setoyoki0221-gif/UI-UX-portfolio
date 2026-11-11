import { useEffect, useState } from "react";
import { Sunset } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

export function WeatherWidget({ delay = 0, onClick }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [sunData, setSunData] = useState(null),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSunData = async () => {
      try {
        const data = await (
          await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=35.4437&longitude=139.6380&daily=sunrise,sunset&timezone=Asia%2FTokyo&forecast_days=1",
          )
        ).json();
        setSunData({
          sunrise: data.daily.sunrise[0],
          sunset: data.daily.sunset[0],
        });
      } catch (error) {
        console.error("Failed to fetch sun data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSunData();
    const intervalId = setInterval(fetchSunData, 3600 * 1e3);
    return () => clearInterval(intervalId);
  }, []);
  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString(language === "ja" ? "ja-JP" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: language !== "ja",
      timeZone: "Asia/Tokyo",
    });
  return (
    <div
      className="flex flex-col items-center gap-2 relative z-[20]"
      style={{
        animationDelay: `${delay}ms`,
        gridColumn: "span 2",
        gridRow: "span 1",
      }}
    >
      <div
        className="relative flex flex-col px-3 overflow-hidden shadow-2xl transition-all duration-200 hover:scale-105 active:scale-90 cursor-pointer text-white items-center justify-center"
        onClick={onClick}
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "22px",
          background: "linear-gradient(180deg, #3B82F6 0%, #2563EB 45%, #1E40AF 100%)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.35), 0 10px 20px -5px rgba(0,0,0,0.3)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        }}
      >
        {loading || !sunData ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-1.5 z-20 w-full mb-0.5">
              <Sunset size={18} className="text-white fill-white opacity-90" />
              <span
                className="text-white font-medium tracking-widest uppercase opacity-80"
                style={{
                  letterSpacing: "1px",
                  fontSize: "19px",
                }}
              >
                {t.weatherWidget.sunset}
              </span>
            </div>
            <div className="flex flex-col items-center z-20 w-full mb-1">
              <span
                className="text-white leading-tight font-semibold tracking-tight drop-shadow-sm text-center"
                style={{
                  fontSize: "22px",
                }}
              >
                {formatTime(sunData.sunset).replace(" ", "")}
              </span>
            </div>
            <div className="relative w-full h-[40px] z-10 flex items-center justify-center my-0 pointer-events-none">
              <svg width="100" height="40" viewBox="0 0 100 40" className="overflow-visible">
                <line
                  x1="-8"
                  y1="28"
                  x2="108"
                  y2="28"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.5"
                />
                <path
                  d="M -8 40 Q 50 -12 108 40"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="14"
                  r="5.5"
                  fill="white"
                  filter="drop-shadow(0 0 5px rgba(255,255,255,0.8))"
                />
              </svg>
            </div>
            <div className="mt-auto z-20 w-full text-center">
              <span
                className="text-white/70 font-medium leading-tight"
                style={{
                  fontSize: "13px",
                }}
              >
                {t.weatherWidget.sunrise}: <span className="text-white">{formatTime(sunData.sunrise)}</span>
              </span>
            </div>
          </>
        )}
      </div>
      <span
        className="text-[11px] max-w-[140px] text-center truncate font-medium text-white drop-shadow-md"
        style={{
          letterSpacing: "-0.1px",
        }}
      >
        {t.weatherWidget.title}
      </span>
    </div>
  );
}
