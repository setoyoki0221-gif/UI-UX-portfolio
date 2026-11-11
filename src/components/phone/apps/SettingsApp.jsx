import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Database,
  Globe,
  Heart,
  MapPin,
  Rocket,
  Users,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { phoneData } from "@/data/phone/profile";
import { getPhoneText } from "@/data/phone/translations";

export function SettingsApp({ onClose, onStartClose }) {
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
    SectionHeader = ({ title }) => (
      <div
        style={{
          fontSize: "0.8125rem",
          color: "#6c6c70",
          textTransform: "uppercase",
          padding: "0 1rem 0.5rem 1rem",
          marginBottom: "0",
          marginTop: "1.5rem",
          letterSpacing: "-0.1px",
        }}
      >
        {title}
      </div>
    ),
    SettingsRow = ({
      icon,
      label,
      value,
      isLink = false,
      isLast = false,
      color = "#007aff",
      textColor = "#000",
      onClick,
    }) => (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "11px 0",
          marginLeft: "16px",
          borderBottom: isLast ? "none" : "0.5px solid #c6c6c8",
          cursor: isLink || onClick ? "pointer" : "default",
        }}
      >
        {icon && (
          <div
            style={{
              minWidth: "28px",
              height: "28px",
              borderRadius: "6px",
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
              color: "white",
            }}
          >
            {icon}
          </div>
        )}
        <div
          style={{
            flex: 1,
            fontSize: "17px",
            color: textColor,
            letterSpacing: "-0.3px",
          }}
        >
          {label}
        </div>
        {value && (
          <div
            style={{
              fontSize: "17px",
              color: "#8e8e93",
              marginRight: isLink ? "8px" : "16px",
            }}
          >
            {value}
          </div>
        )}
        {isLink && (
          <ChevronRight
            size={20}
            color="#c7c7cc"
            style={{
              marginRight: "16px",
            }}
          />
        )}
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
        transform: isVisible ? "scale(1)" : "scale(0.92)",
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
          {t.apps.settings}
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
            padding: "0 1rem 1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            src={phoneData.profile.image}
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "28% 50%",
              border: "1px solid #c6c6c8",
            }}
          />
          <div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 600,
                margin: 0,
                letterSpacing: "0.3px",
              }}
            >
              {phoneData.profile.name}
            </h1>
            <p
              style={{
                fontSize: "15px",
                color: "#8e8e93",
                margin: "2px 0 0 0",
              }}
            >
              {t.profile.role}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#8e8e93",
                margin: "1px 0 0 0",
              }}
            >
              {t.profile.location}
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "0 1rem",
            overflow: "hidden",
          }}
        >
          <SettingsRow
            icon={<MapPin size={16} />}
            label={t.settings.location}
            value={t.profile.location}
            color="#34c759"
            isLast
          />
        </div>
        <SectionHeader title={t.settings.about} />
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "0 1rem",
            padding: "12px 16px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.4",
              color: "#3c3c43",
            }}
          >
            {t.profile.bio}
          </p>
        </div>
        <SectionHeader title={t.settings.future} />
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "0 1rem",
            overflow: "hidden",
          }}
        >
          <SettingsRow icon={<Zap size={16} />} label="AI-assisted workflows" color="#FF9500" />
          <SettingsRow
            icon={<Database size={16} />}
            label="Strong software fundamentals"
            color="#007AFF"
          />
          <SettingsRow icon={<Rocket size={16} />} label="Versatile Engineer" color="#ff9500" />
          <SettingsRow icon={<Users size={16} />} label="Scalable Products" color="#ffcc00" />
          <SettingsRow icon={<Globe size={16} />} label="Web & Cloud Systems" color="#007aff" />
          <SettingsRow icon={<Zap size={16} />} label="Blockchain & Real-time" color="#5856d6" />
          <SettingsRow icon={<Heart size={16} />} label="Open Source" color="#ff2d55" isLast />
        </div>
        <div
          style={{
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#8e8e93",
              margin: 0,
              lineHeight: "1.5",
              maxWidth: "280px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Long-term vision: "Engineer technology that empowers people — everywhere."
          </p>
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
