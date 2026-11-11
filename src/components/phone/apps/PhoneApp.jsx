import { useEffect, useState } from "react";
import { ChevronLeft, Github, Mail, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { phoneData } from "@/data/phone/profile";
import { getPhoneText } from "@/data/phone/translations";

export function PhoneApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);
  const handleBack = () => {
      onStartClose && onStartClose();
      setIsVisible(false);
      setTimeout(onClose, 300);
    },
    ActionButton = ({ icon: Icon, label, color = "#007aff", onClick, isFilled = true }) => (
      <button
        onClick={onClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          background: "white",
          border: "none",
          borderRadius: "12px",
          padding: "12px 0",
          width: "74px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          cursor: "pointer",
          transition: "transform 0.1s active:scale-95",
        }}
      >
        <div
          style={{
            color: color,
          }}
        >
          <Icon size={24} fill={isFilled && color === "#007aff" ? getCurrentColor() : "none"} />
        </div>
        <span
          style={{
            fontSize: "11px",
            color: color,
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </button>
    ),
    getCurrentColor = () => "currentColor",
    InfoRow = ({ label, value, isLast = false, isLink = false, onClick }) => (
      <div
        onClick={onClick}
        style={{
          padding: "12px 16px",
          backgroundColor: "white",
          borderBottom: isLast ? "none" : "0.5px solid #c6c6c8",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          cursor: isLink || onClick ? "pointer" : "default",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "#000",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "17px",
            color: isLink || onClick ? "#007aff" : "#000",
          }}
        >
          {value}
        </span>
      </div>
    );
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#f2f2f7",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        borderRadius: "2.5rem",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "scale(0.92)",
        transition: "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: isVisible ? "auto" : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          paddingTop: "3.5rem",
          paddingBottom: "0.75rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(242, 242, 247, 0.9)",
          backdropFilter: "blur(20px)",
          zIndex: 20,
          position: "sticky",
          top: 0,
          borderRadius: "3rem",
        }}
      >
        <button
          onClick={handleBack}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#007aff",
            fontWeight: 400,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "17px",
            padding: 0,
          }}
        >
          <ChevronLeft
            size={26}
            style={{
              marginLeft: "-8px",
            }}
          />
          <span
            style={{
              letterSpacing: "-0.4px",
            }}
          >
            {t.common.back}
          </span>
        </button>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
            fontSize: "17px",
          }}
        >
          {t.contact.title}
        </span>
      </div>
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 0 1.5rem 0",
            background: "linear-gradient(to bottom, transparent 0%, transparent 100%)",
          }}
        >
          <img
            src={phoneData.profile.image}
            alt="Profile"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "25% 50%",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              marginBottom: "10px",
            }}
          />
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 500,
              margin: 0,
              color: "#000",
              letterSpacing: "-0.5px",
            }}
          >
            {phoneData.profile.name}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#8e8e93",
              margin: "4px 0 0 0",
            }}
          >
            {t.profile.role}
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <ActionButton
              icon={Mail}
              label={t.contact.mail}
              isFilled={false}
              onClick={() => (window.location.href = `mailto:${phoneData.contact.email}`)}
            />
            <ActionButton
              icon={Send}
              label={t.contact.telegram}
              isFilled={false}
              onClick={() => window.open(phoneData.contact.telegramUrl, "_blank")}
            />
            <ActionButton
              icon={Github}
              label="GitHub"
              isFilled={false}
              onClick={() => window.open(phoneData.contact.github, "_blank")}
            />
          </div>
        </div>
        <div
          style={{
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <InfoRow
              label="email"
              value={phoneData.contact.email}
              isLink
              onClick={() => (window.location.href = `mailto:${phoneData.contact.email}`)}
            />
            <InfoRow
              label="telegram"
              value={phoneData.contact.telegram}
              isLast
              isLink
              onClick={() => window.open(phoneData.contact.telegramUrl, "_blank")}
            />
          </div>
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "white",
                minHeight: "80px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#000",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {t.contact.notes}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  color: "#333",
                  lineHeight: "1.4",
                }}
              >
                {t.profile.bio}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "2rem",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "134px",
          height: "5px",
          backgroundColor: "black",
          borderRadius: "100px",
          zIndex: 100,
        }}
      />
    </div>
  );
}
