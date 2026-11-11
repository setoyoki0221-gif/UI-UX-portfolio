import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

export function NotesApp({ onClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);
  const handleClose = () => {
    setVisible(false);
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
        background: "#FFFEF5",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <div
        style={{
          height: "50px",
          backgroundColor: "#FFFEF5",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            left: "16px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            background: "none",
            border: "none",
            color: "#FF9500",
            fontSize: "17px",
            fontWeight: 400,
            cursor: "pointer",
            padding: 0,
          }}
        >
          <ArrowLeft size={20} />
          <span>{t.common.back}</span>
        </button>
        <span
          style={{
            fontSize: "17px",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          {t.apps.notes}
        </span>
      </div>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px 60px 20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1C1C1E",
            margin: "0 0 20px 0",
          }}
        >
          {t.notes.goals}
        </h1>
        <div
          style={{
            fontSize: "17px",
            lineHeight: "1.6",
            color: "#1C1C1E",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              {t.notes.focus}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.focusItems[0]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.focusItems[1]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.focusItems[2]}
              </li>
            </ul>
          </div>
          <div
            style={{
              borderBottom: "1px solid #E5E5E7",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              {t.notes.learn}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.learnItems[0]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.learnItems[1]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.learnItems[2]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.learnItems[3]}
              </li>
            </ul>
          </div>
          <div
            style={{
              borderBottom: "1px solid #E5E5E7",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              {t.notes.build}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.buildItems[0]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.buildItems[1]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.buildItems[2]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.buildItems[3]}
              </li>
            </ul>
          </div>
          <div
            style={{
              borderBottom: "1px solid #E5E5E7",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              {t.notes.explore}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.exploreItems[0]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.exploreItems[1]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.exploreItems[2]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.exploreItems[3]}
              </li>
            </ul>
          </div>
          <div
            style={{
              borderBottom: "1px solid #E5E5E7",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              {t.notes.share}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.shareItems[0]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.shareItems[1]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.shareItems[2]}
              </li>
              <li
                style={{
                  marginBottom: "8px",
                }}
              >
                {t.notes.shareItems[3]}
              </li>
            </ul>
          </div>
          <div
            style={{
              borderBottom: "1px solid #E5E5E7",
              margin: "10px 0",
            }}
          />
          <div
            style={{
              background: "#FFF9E6",
              padding: "10px",
              borderRadius: "12px",
              borderLeft: "4px solid #FF9500",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#FF9500",
                margin: "0 0 1px 0",
              }}
            >
              Goal
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                color: "#1C1C1E",
                lineHeight: "1.5",
              }}
            >
              Build skills quietly.
              <br />
              Ship work consistently.
              <br />
              Let results speak.
            </p>
          </div>
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
