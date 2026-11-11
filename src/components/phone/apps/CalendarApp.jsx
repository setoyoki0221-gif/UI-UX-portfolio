import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { experience } from "@/data/experience";
import { getPhoneText } from "@/data/phone/translations";

const timelineContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const timelineItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
    y: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 12,
    },
  },
};

const timelineLineVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "calc(100% - 50px)",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.1,
    },
  },
};

export function CalendarApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    phoneText = getPhoneText(language),
    timelineItems = experience.map((job, index) => ({
      id: experience.length - index,
      title: language === "ja" ? job.roleJa : job.role,
      company: language === "ja" ? job.companyJa : job.company,
      date: language === "ja" ? job.durationJa : job.duration,
      color: ["#007AFF", "#34C759", "#FF9500", "#FF3B30"][index % 4],
      logo: (language === "ja" ? job.companyJa : job.company)
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    })),
    [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);
  const handleClose = () => {
    onStartClose && onStartClose();
    setIsVisible(false);
    setTimeout(onClose, 300);
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
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
          paddingBottom: "0.8rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#ffffff",
          zIndex: 20,
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            left: "1rem",
            display: "flex",
            alignItems: "center",
            color: "#ff3b30",
            fontWeight: 400,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "17px",
            padding: 0,
          }}
        >
          <ChevronLeft
            size={24}
            style={{
              marginLeft: "-8px",
            }}
          />
          <span>{phoneText.common.back}</span>
        </button>
        <span
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          {phoneText.apps.calendar}
        </span>
        <div
          style={{
            position: "absolute",
            right: "1rem",
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <Search size={22} color="#ff3b30" />
        </div>
      </div>
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "0 1rem 2rem 1rem",
          }}
        >
          <div
            style={{
              padding: "0 0.25rem 1rem 0.25rem",
            }}
          >
            <motion.h1
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
              style={{
                fontSize: "34px",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.01em",
                color: "#000",
              }}
            >
              {phoneText.calendar.title}
            </motion.h1>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={timelineContainerVariants}
            style={{
              position: "relative",
              paddingLeft: "0.5rem",
              paddingTop: "1rem",
            }}
          >
            <motion.div
              variants={timelineLineVariants}
              style={{
                position: "absolute",
                top: "-3px",
                left: "31px",
                width: "2px",
                backgroundColor: "#d1d1d6",
                originY: 0,
              }}
            />
            {timelineItems.map((item) => (
              <motion.div
                variants={timelineItemVariants}
                whileHover={{
                  x: 5,
                }}
                style={{
                  position: "relative",
                  marginBottom: "2.5rem",
                  paddingLeft: "4rem",
                }}
                key={item.id}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: item.color,
                    letterSpacing: "0.04em",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    zIndex: 10,
                  }}
                >
                  {item.logo}
                </div>
                <div
                  style={{
                    paddingTop: "0.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#000",
                      marginBottom: "2px",
                    }}
                  >
                    {item.company}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#8e8e93",
                      fontWeight: 500,
                    }}
                  >
                    {item.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
