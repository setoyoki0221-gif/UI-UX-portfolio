import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { phoneData } from "@/data/phone/profile";
import { getPhoneText } from "@/data/phone/translations";

export function LockScreen({ onUnlock }) {
  const { language } = useLanguage(),
    phoneText = getPhoneText(language),
    [timeText, setTimeText] = useState(""),
    [dateText, setDateText] = useState(""),
    [isPasscodeOpen, setIsPasscodeOpen] = useState(false),
    [passcode, setPasscode] = useState(""),
    [isShaking, setIsShaking] = useState(false);
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeText(
        now
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .replace(" AM", "")
          .replace(" PM", ""),
      );
      setDateText(
        now
          .toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })
          .replace(",", ""),
      );
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  const enterDigit = (digit) => {
      if (passcode.length < 4) {
        const newPasscode = passcode + digit;
        setPasscode(newPasscode);
        newPasscode.length === 4 &&
          (newPasscode === phoneData.passwordHint
            ? setTimeout(onUnlock, 200)
            : (setIsShaking(true),
              setTimeout(() => {
                setPasscode("");
                setIsShaking(false);
              }, 500)));
      }
    },
    deleteDigit = () => {
      setPasscode((current) => current.slice(0, -1));
    };
  useEffect(() => {
    const handleKeyDown = (event) => {
      isPasscodeOpen &&
        (event.key >= "0" && event.key <= "9"
          ? enterDigit(event.key)
          : event.key === "Backspace" || event.key === "Delete"
            ? deleteDigit()
            : event.key === "Enter" &&
              passcode.length === 4 &&
              (passcode === phoneData.passwordHint
                ? onUnlock()
                : (setIsShaking(true),
                  setTimeout(() => {
                    setPasscode("");
                    setIsShaking(false);
                  }, 500))));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPasscodeOpen, passcode, onUnlock]);
  const [touchStartY, setTouchStartY] = useState(null),
    [touchEndY, setTouchEndY] = useState(null),
    minSwipeDistance = 50,
    handleTouchStart = (event) => {
      setTouchEndY(null);
      setTouchStartY(event.targetTouches[0].clientY);
    },
    handleTouchMove = (event) => {
      setTouchEndY(event.targetTouches[0].clientY);
    },
    handleTouchEnd = () => {
      if (!touchStartY || !touchEndY) return;
      touchStartY - touchEndY > minSwipeDistance && setIsPasscodeOpen(true);
    },
    [mouseStartY, setMouseStartY] = useState(null),
    [isMouseDown, setIsMouseDown] = useState(false),
    handleMouseDown = (event) => {
      setIsMouseDown(true);
      setMouseStartY(event.clientY);
    },
    handleMouseMove = (event) => {
      if (!isMouseDown || !mouseStartY) return;
      mouseStartY - event.clientY > minSwipeDistance &&
        (setIsPasscodeOpen(true), setIsMouseDown(false));
    },
    handleMouseEnd = () => {
      setIsMouseDown(false);
      setMouseStartY(null);
    };
  return (
    <div
      className="absolute inset-0 z-[100] flex flex-col items-center justify-between text-white overflow-hidden px-6 pb-8 bg-black/5 pointer-events-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div className="w-full relative pt-2">
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "35px",
            backgroundColor: "black",
            borderRadius: "20px",
            zIndex: 50,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "0px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "14px",
            zIndex: 51,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2.5px",
              height: "16px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "6px",
                backgroundColor: "white",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "9px",
                backgroundColor: "white",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "12px",
                backgroundColor: "white",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "15px",
                backgroundColor: "white",
                borderRadius: "1px",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              letterSpacing: "0.3px",
            }}
          >
            5G
          </span>
          <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
            <rect
              x="1"
              y="2"
              width="26"
              height="12"
              rx="3"
              stroke="white"
              strokeWidth="1.3"
              fill="white"
              fillOpacity="0.3"
            />
            <rect x="3" y="4" width="20" height="8" rx="1.5" fill="white" />
            <rect x="28" y="6" width="3" height="4" rx="1.2" fill="white" fillOpacity="0.6" />
          </svg>
        </div>
      </div>
      {isPasscodeOpen ? (
        <div className="flex flex-col items-center justify-center flex-1 w-full animate-slide-up">
          <div className="relative z-10 flex flex-col items-center">
            <div
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "16px",
              }}
            >
              {phoneText.lock.enterPasscode}
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "20px",
              }}
              className={isShaking ? "animate-shake" : ""}
            >
              {[...Array(4)].map((dot, index) => (
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    backgroundColor: index < passcode.length ? "white" : "transparent",
                    transition: "all 0.2s",
                  }}
                  key={index}
                />
              ))}
            </div>
            <div
              style={{
                marginBottom: "24px",
                color: "rgba(255,255,255,0.7)",
                fontSize: "12px",
                letterSpacing: "0.04em",
                textAlign: "center",
              }}
            >
              {phoneText.lock.hint}
            </div>
            <div className="w-full max-w-[340px]">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                {[
                  {
                    num: 1,
                    letters: "",
                  },
                  {
                    num: 2,
                    letters: "ABC",
                  },
                  {
                    num: 3,
                    letters: "DEF",
                  },
                  {
                    num: 4,
                    letters: "GHI",
                  },
                  {
                    num: 5,
                    letters: "JKL",
                  },
                  {
                    num: 6,
                    letters: "MNO",
                  },
                  {
                    num: 7,
                    letters: "PQRS",
                  },
                  {
                    num: 8,
                    letters: "TUV",
                  },
                  {
                    num: 9,
                    letters: "WXYZ",
                  },
                ].map((digitKey) => (
                  <button
                    onClick={() => enterDigit(digitKey.num.toString())}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      color: "white",
                    }}
                    onMouseEnter={(event) =>
                      (event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                    }
                    onMouseLeave={(event) =>
                      (event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
                    }
                    key={digitKey.num}
                  >
                    <span
                      style={{
                        fontSize: "36px",
                        fontWeight: "300",
                        lineHeight: "1",
                      }}
                    >
                      {digitKey.num}
                    </span>
                    {digitKey.letters && (
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "500",
                          letterSpacing: "0.05em",
                          opacity: "0.5",
                          marginTop: "2px",
                        }}
                      >
                        {digitKey.letters}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                <button
                  className="text-sm font-medium text-white/80 active:text-white text-center"
                  onClick={() => setIsPasscodeOpen(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={() => enterDigit("0")}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    color: "white",
                    gridColumn: "2",
                  }}
                  onMouseEnter={(event) =>
                    (event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                  }
                  onMouseLeave={(event) =>
                    (event.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
                  }
                >
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: "300",
                    }}
                  >
                    0
                  </span>
                </button>
                <button
                  className="text-sm font-medium text-white/80 active:text-white text-center"
                  onClick={deleteDigit}
                >
                  {passcode.length > 0 ? "Delete" : ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            flex: 1,
            paddingTop: "60px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "600",
              opacity: 1,
              marginBottom: "4px",
            }}
          >
            {dateText}
          </div>
          <div
            style={{
              fontSize: "100px",
              fontWeight: "300",
              lineHeight: "1",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            {timeText.split(":").map((part, index) => (
              <span key={index}>
                {part}
                {index === 0 && (
                  <span
                    style={{
                      position: "relative",
                      top: "-15px",
                    }}
                  >
                    :
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
      {!isPasscodeOpen && (
        <div className="flex flex-col items-center pb-8 w-full">
          <style>{`
                        @keyframes swipe-bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-8px); }
                        }
                    `}</style>
          <span
            className="text-sm font-medium opacity-80 drop-shadow-md mb-4"
            style={{
              animation: "swipe-bounce 2s ease-in-out infinite",
            }}
          >
            Swipe up to unlock
          </span>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "140px",
          height: "5px",
          backgroundColor: "white",
          borderRadius: "10px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
