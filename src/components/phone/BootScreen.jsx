import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { phoneData } from "@/data/phone/profile";
import { getPhoneText } from "@/data/phone/translations";

export function BootScreen({ onComplete }) {
  const { language } = useLanguage(),
    phoneText = getPhoneText(language),
    [progress, setProgress] = useState(0);
  useEffect(() => {
    const progressInterval = setInterval(() => {
        setProgress((current) => Math.min(current + 2, 100));
      }, 36),
      completeTimeout = setTimeout(onComplete, 2100);
    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 22%, rgba(74, 222, 128, 0.2), transparent 34%), linear-gradient(145deg, #07130f 0%, #0b211b 48%, #020504 100%)",
        color: "white",
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      }}
    >
      <style>{`
                @keyframes phoneLoaderFloat {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-8px) scale(1.02); }
                }
                @keyframes phoneLoaderSpin {
                    to { transform: rotate(360deg); }
                }
                @keyframes phoneLoaderPulse {
                    0%, 100% { opacity: .35; transform: scale(.92); }
                    50% { opacity: .9; transform: scale(1.08); }
                }
            `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 250,
          height: 250,
          border: "1px solid rgba(134,239,172,.24)",
          borderRadius: "50%",
          animation: "phoneLoaderSpin 18s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 190,
          height: 190,
          border: "1px dashed rgba(250,204,21,.3)",
          borderRadius: "50%",
          animation: "phoneLoaderSpin 12s linear infinite reverse",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "32px",
          textAlign: "center",
          animation: "phoneLoaderFloat 3.4s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 132,
            height: 132,
            margin: "0 auto 28px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              background: "rgba(74,222,128,.22)",
              filter: "blur(18px)",
              animation: "phoneLoaderPulse 2.4s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: 3,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #86efac, #facc15, #22c55e)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "50%",
                background: "#07130f",
              }}
            >
              <img
                src="/img/me.jpg"
                alt={phoneData.profile.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#86efac",
            marginBottom: 12,
          }}
        >
          Portfolio OS
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "-.8px",
          }}
        >
          {phoneData.profile.name}
        </h1>
        <p
          style={{
            margin: "10px 0 34px",
            color: "rgba(255,255,255,.66)",
            fontSize: 13,
          }}
        >
          {phoneData.profile.role}
        </p>
        <div
          style={{
            width: "100%",
            height: 5,
            padding: 1,
            margin: "0 auto",
            borderRadius: 99,
            background: "rgba(255,255,255,.16)",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              borderRadius: 99,
              background: "linear-gradient(90deg, #22c55e, #facc15)",
              boxShadow: "0 0 16px rgba(134,239,172,.7)",
              transition: "width .18s ease-out",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            color: "rgba(255,255,255,.48)",
            fontSize: 10,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          <span>{phoneText.common.preparing}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
