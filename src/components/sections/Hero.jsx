import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { ChevronDown } from "lucide-react";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { useLanguage } from "@/context/LanguageContext";

const RoleTypewriter = () => {
  const { t } = useLanguage(),
    roles = t.hero.roles,
    [roleIndex, setRoleIndex] = useState(0),
    [displayText, setDisplayText] = useState(""),
    [isDeleting, setIsDeleting] = useState(false),
    [charIndex, setCharIndex] = useState(0),
    [delay, setDelay] = useState(200);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentRole = roles[roleIndex];
      isDeleting
        ? (setDisplayText(currentRole.substring(0, charIndex - 1)),
          setCharIndex(charIndex - 1),
          setDelay(40))
        : (setDisplayText(currentRole.substring(0, charIndex + 1)),
          setCharIndex(charIndex + 1),
          setDelay(50));
      !isDeleting && charIndex === currentRole.length
        ? (setDelay(1e3), setIsDeleting(true))
        : isDeleting &&
          charIndex === 0 &&
          (setIsDeleting(false),
          setRoleIndex((index) => (index + 1) % roles.length),
          setDelay(500));
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, roleIndex, delay, roles]);
  return (
    <div id="typewriter-container">
      <span id="typewriter">{displayText}</span>
      <span className="cursor" />
    </div>
  );
};

export const Hero = () => {
  const { t } = useLanguage(),
    launchConfetti = async () => {
      await confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
        colors: ["#22c55e", "#eab308", "#10b981", "#facc15", "#16a34a"],
      });
    };
  useEffect(() => {
    const handleKeyDown = (event) => {
      var fsElement,
        requestFullscreen,
        webkitElement,
        webkitRequestFullscreen,
        msElement,
        msRequestFullscreen,
        exitFullscreen,
        webkitExitFullscreen,
        msExitFullscreen;
      const target = event.target,
        isEditable =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.contentEditable === "true" ||
            target.closest("input, textarea, [contenteditable]"));
      event.key.toLowerCase() === "f" &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        !isEditable &&
        (event.preventDefault(),
        document.fullscreenElement
          ? ((exitFullscreen = document.exitFullscreen) != null && exitFullscreen.call(document)) ||
            ((webkitExitFullscreen = document.webkitExitFullscreen) != null &&
              webkitExitFullscreen.call(document)) ||
            (msExitFullscreen = document.msExitFullscreen) == null ||
            msExitFullscreen.call(document)
          : ((requestFullscreen = (fsElement = document.documentElement).requestFullscreen) !=
              null &&
              requestFullscreen.call(fsElement)) ||
            ((webkitRequestFullscreen = (webkitElement = document.documentElement)
              .webkitRequestFullscreen) != null &&
              webkitRequestFullscreen.call(webkitElement)) ||
            (msRequestFullscreen = (msElement = document.documentElement).msRequestFullscreen) ==
              null ||
            msRequestFullscreen.call(msElement));
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <section
      id="home"
      className="min-h-screen flex items-start lg:items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-12 lg:pt-0 lg:pb-0"
    >
      <div className="container mx-auto max-w-7xl z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12 min-h-[auto] lg:min-h-[80vh]">
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start">
            <p className="text-green-500 font-medium mb-2 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
              {t.hero.greeting}
            </p>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-800 dark:text-white mb-4 leading-tight text-center lg:text-left break-words max-w-full">
              <ScrambleText />
            </div>
            <div className="text-lg sm:text-xl md:text-2xl text-green-600 font-light mb-6 min-h-[2rem] sm:min-h-[2.5rem] text-center lg:text-left break-words max-w-full">
              <RoleTypewriter />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-sm sm:text-base leading-relaxed mx-auto lg:mx-0">
              {t.hero.bio}
            </p>
            <div className="flex items-center space-x-4 sm:space-x-6 justify-center lg:justify-start mb-8">
              <div className="relative group flex items-center">
                <a
                  href="https://github.com/shinobi-coder701"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={16} className="sm:w-4 sm:h-4" />
                </a>
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {t.hero.githubTooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white" />
                </div>
              </div>
              <div className="relative group flex items-center">
                <a
                  href="https://wa.me/817089764369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="WhatsApp +81 70-8976-4369"
                >
                  <SiWhatsapp size={16} className="sm:w-4 sm:h-4" />
                </a>
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {t.hero.whatsappTooltip}: +81 70-8976-4369
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white" />
                </div>
              </div>
              <div className="relative group flex items-center">
                <a
                  href="mailto:shinobi.coder701@gmail.com"
                  className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-300 transition-all duration-300 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Send Email"
                >
                  <SiGmail size={16} className="sm:w-4 sm:h-4" />
                </a>
                <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {t.hero.emailTooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-gray-900 dark:border-t-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative">
              <div className="absolute inset-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-900/30 dark:via-gray-800/50 dark:to-green-800/30 shadow-xl">
                <div className="absolute top-6 sm:top-8 left-4 sm:left-6 right-4 sm:right-6 space-y-1.5 sm:space-y-2 opacity-30 dark:opacity-25">
                  <div className="h-0.5 sm:h-1 bg-green-400 dark:bg-green-300 rounded-full w-[90%]" />
                  <div className="h-0.5 sm:h-1 bg-green-300 dark:bg-green-400 rounded-full w-[75%]" />
                  <div className="h-0.5 sm:h-1 bg-green-200 dark:bg-green-500 rounded-full w-[95%]" />
                </div>
                <div className="absolute top-12 sm:top-16 left-3 sm:left-4 right-3 sm:right-4 space-y-2 sm:space-y-3 opacity-20 dark:opacity-15 text-xs text-gray-700 dark:text-gray-300">
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="h-1.5 sm:h-2 bg-gray-400 dark:bg-gray-300 rounded w-[85%]" />
                    <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-400 rounded w-[80%]" />
                    <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-400 rounded w-[75%]" />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <div className="h-1.5 sm:h-2 bg-green-400 dark:bg-green-300 rounded w-[85%]" />
                    <div className="h-0.5 sm:h-1 bg-green-300 dark:bg-green-400 rounded w-[90%]" />
                  </div>
                </div>
                <div className="absolute bottom-6 sm:bottom-8 left-3 sm:left-6 right-3 sm:right-6 flex flex-wrap gap-0.5 sm:gap-1 opacity-30 dark:opacity-25">
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-200 dark:bg-green-700 rounded-full text-xs text-green-800 dark:text-green-200">
                    #React
                  </div>
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-200 dark:bg-green-700 rounded-full text-xs text-green-800 dark:text-green-200">
                    #Web
                  </div>
                  <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-200 dark:bg-yellow-700 rounded-full text-xs text-yellow-800 dark:text-yellow-200">
                    #Blog
                  </div>
                </div>
                <div className="absolute top-1/3 left-1.5 sm:left-2 right-1.5 sm:right-2 opacity-15 dark:opacity-12">
                  <div className="space-y-0.5 sm:space-y-1 text-xs font-mono text-gray-600 dark:text-gray-300">
                    <div className="flex space-x-1">
                      <span className="text-green-500 dark:text-green-400">const</span>
                      <span>{"blog = "}</span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="text-yellow-500 dark:text-yellow-400">function</span>
                      <span className="text-green-500 dark:text-green-400">write()</span>
                    </div>
                  </div>
                </div>
              </div>
              <picture>
                <source srcSet="/img/me-dark.jpg" media="(prefers-color-scheme: dark)" />
                <img
                  src="/img/me.png"
                  alt="Shinobi Coder - Full Stack Developer"
                  className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-white dark:hidden"
                  onMouseEnter={launchConfetti}
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
              <img
                src="/img/me-dark.jpg"
                alt="Shinobi Coder - Full Stack Developer"
                className="relative z-10 hidden w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 border-4 border-gray-700 dark:block"
                onMouseEnter={launchConfetti}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 lg:absolute lg:bottom-12 lg:left-1/2 lg:transform lg:-translate-x-1/2 flex flex-col items-center z-20 pb-8 lg:pb-0">
          <span className="text-gray-600 dark:text-gray-300 text-sm mb-2 font-medium">
            {t.hero.scrollDown}
          </span>
          <ChevronDown className="text-green-500 dark:text-green-400 animate-bounce w-6 h-6 drop-shadow-lg" />
        </div>
      </div>
    </section>
  );
};
