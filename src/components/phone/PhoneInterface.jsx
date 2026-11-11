import { useEffect, useRef, useState } from "react";
import { MapPinned } from "lucide-react";
import {
  messagesIcon,
  musicIcon,
  notesIcon,
  phoneIcon,
  safariIcon,
  settingsIcon,
} from "@/assets/phone";
import { DockAppIcon, PhoneAppIcon } from "@/components/phone/AppIcons";
import { AssistiveTouch } from "@/components/phone/AssistiveTouch";
import { BootScreen } from "@/components/phone/BootScreen";
import { LockScreen } from "@/components/phone/LockScreen";
import { SpotlightSearch } from "@/components/phone/SpotlightSearch";
import { CalendarApp } from "@/components/phone/apps/CalendarApp";
import { MapsApp } from "@/components/phone/apps/MapsApp";
import { MessagesApp } from "@/components/phone/apps/MessagesApp";
import { MusicApp } from "@/components/phone/apps/MusicApp";
import { NotesApp } from "@/components/phone/apps/NotesApp";
import { PhoneApp } from "@/components/phone/apps/PhoneApp";
import { SafariApp } from "@/components/phone/apps/SafariApp";
import { SettingsApp } from "@/components/phone/apps/SettingsApp";
import { WeatherApp } from "@/components/phone/apps/WeatherApp";
import { CalendarWidget } from "@/components/phone/widgets/CalendarWidget";
import { ClockWidget } from "@/components/phone/widgets/ClockWidget";
import { ProjectsWidget } from "@/components/phone/widgets/ProjectsWidget";
import { WeatherWidget } from "@/components/phone/widgets/WeatherWidget";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

export function PhoneInterface() {
  const { language } = useLanguage(),
    phoneText = getPhoneText(language),
    [phoneState, setPhoneState] = useState("LOCKED"),
    [isBooting, setIsBooting] = useState(true),
    [pageIndex, setPageIndex] = useState(0),
    [timeText, setTimeText] = useState(""),
    [activeApp, setActiveApp] = useState(null),
    [isClosingApp, setIsClosingApp] = useState(false),
    launchApp = (appId) => {
      setIsClosingApp(false);
      setActiveApp(appId);
    };
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12;
      hours = hours || 12;
      setTimeText(`${hours}:${minutes.toString().padStart(2, "0")}`);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    var viewportOnResize, viewportOnScroll;
    const updateViewport = () => {
      var heightViewport, widthViewport;
      const viewportHeight =
          ((heightViewport = window.visualViewport) == null ? void 0 : heightViewport.height) ??
          window.innerHeight,
        viewportWidth =
          ((widthViewport = window.visualViewport) == null ? void 0 : widthViewport.width) ??
          window.innerWidth,
        scale = Math.min(1, (viewportWidth - 32) / 380, (viewportHeight - 32) / 780);
      document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);
      document.documentElement.style.setProperty("--phone-scale", `${scale}`);
      document.documentElement.style.setProperty("--phone-stage-width", `${380 * scale}px`);
      document.documentElement.style.setProperty("--phone-stage-height", `${780 * scale}px`);
    };
    updateViewport();
    (viewportOnResize = window.visualViewport) == null ||
      viewportOnResize.addEventListener("resize", updateViewport);
    (viewportOnScroll = window.visualViewport) == null ||
      viewportOnScroll.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      var viewportOffResize, viewportOffScroll;
      (viewportOffResize = window.visualViewport) == null ||
        viewportOffResize.removeEventListener("resize", updateViewport);
      (viewportOffScroll = window.visualViewport) == null ||
        viewportOffScroll.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);
  const previousStateRef = useRef(phoneState);
  useEffect(() => {
    const speak = (text) => {
      if (!("speechSynthesis" in window)) return;
      const speakNow = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text),
          voices = window.speechSynthesis.getVoices();
        console.log(
          "Available Voices:",
          voices.map((voice) => voice.name),
        );
        const langCode = language === "ja" ? "ja-JP" : "en-US";
        utterance.lang = langCode;
        const preferredVoice = voices.find((voice) =>
          voice.lang.toLowerCase().startsWith(language === "ja" ? "ja" : "en"),
        );
        preferredVoice && (utterance.voice = preferredVoice);
        utterance.rate = 1;
        utterance.pitch = 1;
        console.log(
          `[Voice] Speaking: "${text}" | Language: ${langCode} | State: ${phoneState} | Voice: ${(preferredVoice == null ? void 0 : preferredVoice.name) ?? "Default"}`,
        );
        window.speechSynthesis.speak(utterance);
      };
      if (window.speechSynthesis.getVoices().length === 0) {
        let attempts = 0;
        const pollId = setInterval(() => {
          attempts++;
          (window.speechSynthesis.getVoices().length > 0 || attempts > 20) &&
            (clearInterval(pollId), speakNow());
        }, 100);
      } else speakNow();
    };
    if (!isBooting && phoneState === "LOCKED" && previousStateRef.current === phoneState) {
      const unlockTimeout = setTimeout(() => {
        window.speechSynthesis.resume();
        speak(phoneText.lock.unlock);
      }, 500);
      return () => clearTimeout(unlockTimeout);
    }
    isBooting ||
      previousStateRef.current === phoneState ||
      (phoneState === "LOCKED" &&
      (previousStateRef.current === "BOOTING" || previousStateRef.current === "UNLOCKED")
        ? setTimeout(() => {
            window.speechSynthesis.resume();
            speak(phoneText.lock.unlock);
          }, 1e3)
        : phoneState === "UNLOCKED" &&
          previousStateRef.current === "LOCKED" &&
          speak(phoneText.lock.welcome),
      (previousStateRef.current = phoneState));
  }, [isBooting, language, phoneState]);
  const pages = [
      [
        {
          type: "search",
        },
        {
          type: "clock",
        },
        {
          type: "weather",
        },
        {
          image: settingsIcon,
          label: phoneText.apps.settings,
        },
        {
          image: musicIcon,
          label: phoneText.apps.music,
        },
        {
          type: "calendar",
        },
        {
          type: "map",
        },
      ],
      [
        {
          type: "projects",
        },
      ],
    ],
    dockApps = [
      {
        image: phoneIcon,
        label: phoneText.apps.contact,
      },
      {
        image: safariIcon,
        label: phoneText.apps.safari,
      },
      {
        image: messagesIcon,
        label: phoneText.apps.messages,
      },
      {
        image: notesIcon,
        label: phoneText.apps.notes,
      },
    ],
    changePage = (direction) => {
      direction === "right" && pageIndex < pages.length - 1
        ? setPageIndex(pageIndex + 1)
        : direction === "left" && pageIndex > 0 && setPageIndex(pageIndex - 1);
    };
  return (
    <div className="phone-frame relative w-[380px] h-[780px] bg-black rounded-[3rem] shadow-2xl ring-8 ring-slate-800">
      <div
        className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url("/wallpaper.png")',
        }}
      >
        {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
        {!isBooting && phoneState === "LOCKED" && (
          <LockScreen onUnlock={() => setPhoneState("UNLOCKED")} />
        )}
        <div
          id="phone-main-interface"
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${phoneState === "UNLOCKED" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{
            touchAction: activeApp ? "auto" : "none",
            overscrollBehavior: "contain",
          }}
          onTouchStart={(event) => {
            if (activeApp || event.target.closest("[data-assistive-touch]")) return;
            if (event.touches.length === 3) {
              const clientX = event.touches[0].clientX;
              event.currentTarget.dataset.threeFingerStartX = clientX.toString();
              event.currentTarget.dataset.threeFingerTriggered = "false";
              return;
            }
            const touch = event.targetTouches[0];
            event.currentTarget.dataset.touchStartX = touch.clientX.toString();
          }}
          onTouchMove={(event) => {
            if (
              !activeApp &&
              (event.cancelable && event.preventDefault(),
              event.touches.length === 3 && event.currentTarget.dataset.threeFingerStartX)
            ) {
              if (event.currentTarget.dataset.threeFingerTriggered === "true") return;
              const startX = parseFloat(event.currentTarget.dataset.threeFingerStartX),
                currentX = event.touches[0].clientX,
                deltaX = startX - currentX;
              deltaX !== 0 &&
                ((event.currentTarget.dataset.threeFingerTriggered = "true"),
                deltaX > 0 ? changePage("right") : changePage("left"));
            }
          }}
          onTouchEnd={(event) => {
            if (activeApp) return;
            if (
              event.changedTouches.length === 3 &&
              event.currentTarget.dataset.threeFingerStartX
            ) {
              const threeFingerStartX = parseFloat(event.currentTarget.dataset.threeFingerStartX),
                threeFingerEndX = event.changedTouches[0].clientX,
                threeFingerDeltaX = threeFingerStartX - threeFingerEndX;
              Math.abs(threeFingerDeltaX) > 5 &&
                (threeFingerDeltaX > 0 ? changePage("right") : changePage("left"));
              delete event.currentTarget.dataset.threeFingerStartX;
              return;
            }
            const startX = parseFloat(event.currentTarget.dataset.touchStartX || "0"),
              endX = event.changedTouches[0].clientX,
              deltaX = startX - endX;
            Math.abs(deltaX) > 50 && (deltaX > 0 ? changePage("right") : changePage("left"));
          }}
          onMouseDown={(event) => {
            activeApp || (event.currentTarget.dataset.mouseStartX = event.clientX.toString());
          }}
          onMouseUp={(event) => {
            if (activeApp) return;
            const startX = parseFloat(event.currentTarget.dataset.mouseStartX || "0"),
              endX = event.clientX,
              deltaX = startX - endX;
            Math.abs(deltaX) > 50 && (deltaX > 0 ? changePage("right") : changePage("left"));
          }}
        >
          <div className="w-full relative pt-2">
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "50px",
                fontSize: "19px",
                fontWeight: "600",
                color: activeApp && !isClosingApp ? "black" : "white",
                zIndex: 301,
                transition: activeApp && !isClosingApp ? "color 0.2s ease" : "none",
              }}
            >
              {timeText || "9:41"}
            </div>
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
                zIndex: 300,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "24px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "14px",
                zIndex: 301,
                color: activeApp && !isClosingApp ? "black" : "white",
                transition: activeApp && !isClosingApp ? "color 0.2s ease" : "none",
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
                    backgroundColor: activeApp && !isClosingApp ? "black" : "white",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    width: "4px",
                    height: "9px",
                    backgroundColor: activeApp && !isClosingApp ? "black" : "white",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    width: "4px",
                    height: "12px",
                    backgroundColor: activeApp && !isClosingApp ? "black" : "white",
                    borderRadius: "1px",
                  }}
                />
                <div
                  style={{
                    width: "4px",
                    height: "15px",
                    backgroundColor: activeApp && !isClosingApp ? "black" : "white",
                    borderRadius: "1px",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  letterSpacing: "0.3px",
                  color: activeApp && !isClosingApp ? "black" : "white",
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
                  stroke={activeApp && !isClosingApp ? "black" : "white"}
                  strokeWidth="1.3"
                  fill={activeApp && !isClosingApp ? "black" : "white"}
                  fillOpacity="0.3"
                />
                <rect
                  x="3"
                  y="4"
                  width="20"
                  height="8"
                  rx="1.5"
                  fill={activeApp && !isClosingApp ? "black" : "white"}
                />
                <rect
                  x="28"
                  y="6"
                  width="3"
                  height="4"
                  rx="1.2"
                  fill={activeApp && !isClosingApp ? "black" : "white"}
                  fillOpacity="0.6"
                />
              </svg>
            </div>
          </div>
          <div
            className="flex flex-col h-full px-4 pb-4 justify-between"
            style={{
              pointerEvents: activeApp ? "none" : "auto",
            }}
          >
            <div
              className="flex flex-1"
              style={{
                transform: `translateX(-${(pageIndex * 100) / pages.length}%)`,
                width: `${pages.length * 100}%`,
                marginTop: "60px",
                transition: "transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                paddingLeft: "8px",
                paddingRight: "24px",
                willChange: "transform",
              }}
            >
              {pages.map((page, index) => (
                <div
                  className="grid grid-cols-4 content-start w-full flex-shrink-0"
                  style={{
                    width: `${100 / pages.length}%`,
                    gap: "2px 2px",
                    rowGap: "48px",
                  }}
                  key={index}
                >
                  {page.map((item, itemIndex) => {
                    if ("type" in item && item.type === "search")
                      return <SpotlightSearch onOpenApp={launchApp} key={itemIndex} />;
                    if ("type" in item && item.type === "clock")
                      return <ClockWidget delay={itemIndex * 50} key={itemIndex} />;
                    if ("type" in item && item.type === "weather")
                      return (
                        <WeatherWidget
                          delay={itemIndex * 50}
                          onClick={() => launchApp("weather")}
                          key={itemIndex}
                        />
                      );
                    if ("type" in item && item.type === "projects")
                      return <ProjectsWidget key={itemIndex} />;
                    if ("type" in item && item.type === "empty") return <div key={itemIndex} />;
                    if ("type" in item && item.type === "calendar")
                      return (
                        <CalendarWidget
                          delay={itemIndex * 50}
                          onClick={() => launchApp("calendar")}
                          isOpen={activeApp === "calendar" && !isClosingApp}
                          key={itemIndex}
                        />
                      );
                    if ("type" in item && item.type === "map")
                      return (
                        <PhoneAppIcon
                          icon={MapPinned}
                          label={phoneText.apps.map}
                          color="blue"
                          delay={itemIndex * 50}
                          size={62}
                          onClick={() => launchApp("map")}
                          dataTutorial="map"
                          key={itemIndex}
                        />
                      );
                    const label = "label" in item ? item.label : "",
                      image = "image" in item ? item.image : void 0,
                      handleClick =
                        label === phoneText.apps.settings
                          ? () => launchApp("settings")
                          : label === phoneText.apps.music
                            ? () => launchApp("music")
                            : void 0,
                      getTutorialId = () => {
                        if (label === phoneText.apps.calendar) return "calendar";
                        if (label === phoneText.apps.settings) return "settings";
                        if (label === phoneText.apps.weather) return "weather";
                        if (label === phoneText.apps.music) return "music";
                      };
                    return (
                      <PhoneAppIcon
                        image={image}
                        label={label}
                        delay={itemIndex * 50}
                        size={62}
                        onClick={handleClick}
                        dataTutorial={getTutorialId()}
                        key={itemIndex}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {pages.map((page, index) => (
                <button
                  onClick={() => setPageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${pageIndex === index ? "w-6 bg-black/40" : "w-2 bg-black/15 hover:bg-black/25"}`}
                  key={index}
                />
              ))}
            </div>
            {pages.length > 1 && (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "8px",
                  animation: "fadeInOut 3s ease-in-out infinite",
                  opacity: activeApp ? 0 : 1,
                  transition: "opacity 300ms ease",
                  pointerEvents: activeApp ? "none" : "auto",
                }}
              >
                <style>{`
                      @keyframes fadeInOut {
                        0%, 100% { opacity: 0.4; }
                        50% { opacity: 0.8; }
                      }
                    `}</style>
                <span
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {pageIndex === 0 ? "Swipe to see more →" : "← Swipe back"}
                </span>
              </div>
            )}
            <div
              style={{
                borderRadius: "28px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(50px) saturate(180%)",
                WebkitBackdropFilter: "blur(50px) saturate(180%)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                padding: "14px 16px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                {dockApps.map((dockApp, index) => (
                  <DockAppIcon
                    image={dockApp.image}
                    label={dockApp.label}
                    onClick={() =>
                      dockApp.label === phoneText.apps.contact
                        ? launchApp("phone")
                        : dockApp.label === phoneText.apps.messages
                          ? launchApp("messages")
                          : dockApp.label === phoneText.apps.safari
                            ? launchApp("safari")
                            : dockApp.label === phoneText.apps.notes
                              ? launchApp("notes")
                              : void 0
                    }
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
          {activeApp === "calendar" && (
            <CalendarApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "settings" && (
            <SettingsApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "phone" && (
            <PhoneApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "music" && (
            <MusicApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "messages" && (
            <MessagesApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "safari" && (
            <SafariApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "map" && (
            <MapsApp
              onClose={() => setActiveApp(null)}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "weather" && (
            <WeatherApp
              onClose={() => {
                setIsClosingApp(true);
                setTimeout(() => setActiveApp(null), 300);
              }}
              onStartClose={() => setIsClosingApp(true)}
            />
          )}
          {activeApp === "notes" && <NotesApp onClose={() => setActiveApp(null)} />}
          {phoneState === "UNLOCKED" && <AssistiveTouch onLock={() => setPhoneState("LOCKED")} />}
        </div>
      </div>
    </div>
  );
}
