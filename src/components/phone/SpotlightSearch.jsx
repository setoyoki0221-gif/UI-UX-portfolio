import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import { googleMicIcon } from "@/assets/phone";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

const searchIcon =
  "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M22.56%2012.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26%201.37-1.04%202.53-2.21%203.31v2.77h3.57c2.08-1.92%203.28-4.74%203.28-8.09z'%20fill='%234285F4'/%3e%3cpath%20d='M12%2023c2.97%200%205.46-.98%207.28-2.66l-3.57-2.77c-.98.66-2.23%201.06-3.71%201.06-2.86%200-5.29-1.93-6.16-4.53H2.18v2.84C3.99%2020.53%207.7%2023%2012%2023z'%20fill='%2334A853'/%3e%3cpath%20d='M5.84%2014.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43%208.55%201%2010.22%201%2012s.43%203.45%201.18%204.93l2.85-2.22.81-.62z'%20fill='%23FBBC05'/%3e%3cpath%20d='M12%205.38c1.62%200%203.06.56%204.21%201.64l3.15-3.15C17.45%202.09%2014.97%201%2012%201%207.7%201%203.99%203.47%202.18%207.07l3.66%202.84c.87-2.6%203.3-4.53%206.16-4.53z'%20fill='%23EA4335'/%3e%3c/svg%3e";

export function SpotlightSearch({ onOpenApp }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [searchQuery, setSearchQuery] = useState(""),
    [countdown, setCountdown] = useState(3),
    [voiceState, setVoiceState] = useState("idle"),
    [isOverlayOpen, setIsOverlayOpen] = useState(false),
    searchBarRef = useRef(null),
    [searchBarRect, setSearchBarRect] = useState(null),
    filteredResults = [
      {
        title: t.apps.calendar,
        description: t.search.work,
        category: "App",
        appId: "calendar",
      },
      {
        title: t.apps.settings,
        description: t.search.profile,
        category: "App",
        appId: "settings",
      },
      {
        title: t.apps.weather,
        description: t.search.weather,
        category: "App",
        appId: "weather",
      },
      {
        title: t.apps.map,
        description: t.search.location,
        category: "App",
        appId: "map",
      },
      {
        title: t.apps.music,
        description: t.search.skills,
        category: "App",
        appId: "music",
      },
      {
        title: t.apps.safari,
        description: t.search.projects,
        category: "App",
        appId: "safari",
      },
      {
        title: t.apps.messages,
        description: t.search.profile,
        category: "App",
        appId: "messages",
      },
      {
        title: t.apps.contact,
        description: t.search.profile,
        category: "App",
        appId: "phone",
      },
      {
        title: t.apps.notes,
        description: t.search.projects,
        category: "App",
        appId: "notes",
      },
    ].filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    recognitionRef = useRef(null),
    countdownTimerRef = useRef(null),
    closeOverlay = () => {
      if (
        (countdownTimerRef.current &&
          (clearInterval(countdownTimerRef.current), (countdownTimerRef.current = null)),
        recognitionRef.current)
      ) {
        try {
          recognitionRef.current.abort();
        } catch {}
        recognitionRef.current = null;
      }
      setVoiceState("idle");
      setIsOverlayOpen(false);
    },
    startVoiceSearch = () => {
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        alert("Voice recognition is not supported in this browser.");
        return;
      }
      if ((closeOverlay(), searchBarRef.current)) {
        const rect = searchBarRef.current.getBoundingClientRect();
        setSearchBarRect(rect);
      }
      setVoiceState("loading");
      setSearchQuery("");
      setIsOverlayOpen(true);
      setCountdown(3);
      const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition,
        recognition = new SpeechRecognitionCtor();
      recognitionRef.current = recognition;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => {
        if ((setVoiceState("listening"), searchBarRef.current && !searchBarRect)) {
          const rect = searchBarRef.current.getBoundingClientRect();
          setSearchBarRect(rect);
        }
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Voice result:", transcript);
        const cleanedTranscript = transcript.replace(/[.,!?;:]/g, "");
        if (cleanedTranscript.includes("open")) {
          const appCommands = {
              music: "music",
              notes: "notes",
              calendar: "calendar",
              settings: "settings",
              weather: "weather",
              map: "map",
              safari: "safari",
              messages: "messages",
              contact: "phone",
              contacts: "phone",
              phone: "phone",
              project: "projects",
              projects: "projects",
            },
            matchedKeyword = Object.keys(appCommands).find((keyword) =>
              cleanedTranscript.includes(keyword),
            );
          if (matchedKeyword && onOpenApp) {
            onOpenApp(appCommands[matchedKeyword]);
            setIsOverlayOpen(false);
            return;
          }
        }
        setSearchQuery(transcript);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setVoiceState("idle");
      };
      recognition.onend = () => {
        setVoiceState("idle");
      };
      let remaining = 3;
      countdownTimerRef.current = setInterval(() => {
        if ((remaining--, setCountdown(remaining), remaining === 0)) {
          countdownTimerRef.current && clearInterval(countdownTimerRef.current);
          try {
            recognition.start();
          } catch (error) {
            console.error("Recognition start error:", error);
            setVoiceState("idle");
          }
        }
      }, 1e3);
    };
  useEffect(() => {
    if (isOverlayOpen) {
      const preventTouchMove = (event) => event.preventDefault();
      document.body.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.body.removeEventListener("touchmove", preventTouchMove);
      };
    } else ((document.body.style.overflow = ""), (document.body.style.paddingRight = ""));
  }, [isOverlayOpen]);
  const handleQueryChange = (value) => {
      setSearchQuery(value);
    },
    openOverlay = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        setSearchBarRect(rect);
        setIsOverlayOpen(true);
      }
    },
    renderSearchInput = (isOverlay) => (
      <div
        className="w-full rounded-full px-5 py-3 flex items-center gap-3 relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "white",
        }}
      >
        <img
          src={searchIcon}
          alt="Google"
          width="32"
          height="32"
          style={{
            marginLeft: "8px",
          }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => handleQueryChange(event.target.value)}
          onFocus={isOverlay ? void 0 : openOverlay}
          placeholder={
            voiceState === "loading"
              ? `Wait ${countdown}...`
              : voiceState === "listening"
                ? "Speak Now..."
                : t.search.placeholder
          }
          className="flex-1 bg-transparent text-white text-sm placeholder-white/60 outline-none"
          style={{
            caretColor: "white",
            outline: "none",
          }}
          autoFocus={isOverlay}
        />
        <div className="flex items-center gap-2">
          <button
            className="rounded-full transition-all duration-300 flex items-center justify-center hover:bg-white/10"
            onClick={startVoiceSearch}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: voiceState === "listening" ? "rgba(219, 68, 55, 0.4)" : "transparent",
              boxShadow: voiceState === "listening" ? "0 0 15px rgba(219, 68, 55, 0.5)" : "none",
              animation: voiceState === "listening" ? "pulse 1.5s infinite" : "none",
              marginLeft: "8px",
            }}
          >
            <img src={googleMicIcon} alt="Voice Search" width="24" height="24" />
          </button>
        </div>
      </div>
    );
  return (
    <>
      {isOverlayOpen &&
        searchBarRect &&
        createPortal(
          <div
            className="absolute inset-0 z-[9999]"
            style={{
              pointerEvents: "auto",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "3rem 3rem 0 0",
              }}
              onClick={closeOverlay}
            />
            <div
              style={{
                position: "absolute",
                top: (() => {
                  const phoneInterface = document.getElementById("phone-main-interface"),
                    interfaceRect = phoneInterface
                      ? phoneInterface.getBoundingClientRect()
                      : {
                          top: 0,
                        };
                  return `${searchBarRect.top - interfaceRect.top}px`;
                })(),
                left: (() => {
                  const phoneInterface = document.getElementById("phone-main-interface"),
                    interfaceRect = phoneInterface
                      ? phoneInterface.getBoundingClientRect()
                      : {
                          left: 0,
                        };
                  return `${searchBarRect.left - interfaceRect.left}px`;
                })(),
                width: `${searchBarRect.width}px`,
                zIndex: 1e4,
              }}
            >
              {renderSearchInput(true)}
              {filteredResults.length > 0 && (
                <div
                  className="absolute top-full rounded-2xl overflow-hidden z-[10000] [&::-webkit-scrollbar]:hidden"
                  style={{
                    left: "0px",
                    right: "0px",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    maxHeight: "240px",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    marginTop: "12px",
                  }}
                >
                  {filteredResults.slice(0, 5).map((result, index) => (
                    <div
                      className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      }}
                      onClick={() => {
                        result.appId && onOpenApp && onOpenApp(result.appId);
                        setSearchQuery("");
                        setIsOverlayOpen(false);
                      }}
                      key={index}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3 h-3" stroke="white" strokeWidth={2} />
                        <div className="flex-1">
                          <div className="text-white text-sm font-semibold">{result.title}</div>
                          <div className="text-white text-xs">{result.description}</div>
                        </div>
                        <span
                          className="text-white text-[10px]"
                          style={{
                            marginRight: "16px",
                          }}
                        >
                          {result.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery.trim() !== "" && filteredResults.length === 0 && (
                <div
                  className="absolute top-full rounded-2xl overflow-hidden z-[10000] [&::-webkit-scrollbar]:hidden"
                  style={{
                    left: "0px",
                    right: "0px",
                    background: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    marginTop: "12px",
                  }}
                >
                  <div
                    className="px-4 py-3"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    <div className="text-white text-xs text-center">No results found</div>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.getElementById("phone-main-interface") || document.body,
        )}
      <div
        className="flex flex-col items-center gap-2 opacity-0 animate-fade-in col-span-4 relative z-0"
        data-tutorial="search"
        style={{
          animationDelay: "0ms",
          animationFillMode: "forwards",
          height: "auto",
        }}
      >
        <div className="w-full relative z-0" ref={searchBarRef}>
          <div
            style={{
              opacity: isOverlayOpen ? 0 : 1,
            }}
          >
            {renderSearchInput(false)}
          </div>
        </div>
      </div>
    </>
  );
}
