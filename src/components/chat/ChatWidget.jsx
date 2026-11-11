import { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Loader,
  Loader2,
  Maximize2,
  Minimize2,
  Phone,
  Send,
  User,
  X as CloseIcon,
} from "lucide-react";
import { getLocalReply } from "@/components/chat/getLocalReply";
import { suggestedQuestions } from "@/components/chat/suggestedQuestions";
import { useLanguage } from "@/context/LanguageContext";

export function ChatWidget({ onOpenPhone }) {
  const { language, t } = useLanguage(),
    [isOpen, setIsOpen] = useState(false),
    [isMinimized, setIsMinimized] = useState(false),
    [messages, setMessages] = useState(() => {
      if (typeof window < "u") {
        const storedMessages = localStorage.getItem("ai-assistant-messages");
        if (storedMessages)
          return JSON.parse(storedMessages, (key, value) =>
            key === "timestamp" ? new Date(value) : value,
          );
      }
      return [];
    }),
    [inputValue, setInputValue] = useState(""),
    [isLoading, setIsLoading] = useState(false),
    [isInitializing, setIsInitializing] = useState(false),
    [userScrolledUp, setUserScrolledUp] = useState(false),
    messagesEndRef = useRef(null),
    inputRef = useRef(null),
    containerRef = useRef(null),
    lastScrollTopRef = useRef(0),
    scrollToBottom = useCallback(() => {
      const container = containerRef.current;
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      scrollTop + clientHeight >= scrollHeight - 50 &&
        !userScrolledUp &&
        container.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
    }, [userScrolledUp]);
  useEffect(() => {
    messages.length > 0 && localStorage.setItem("ai-assistant-messages", JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (!userScrolledUp) {
      const timeoutId = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, userScrolledUp, scrollToBottom]);
  useEffect(
    () => (
      isOpen && !isMinimized && inputRef.current && window.innerWidth >= 768 && inputRef.current.focus(),
      isOpen && !isMinimized
        ? document.body.classList.add("chat-open")
        : document.body.classList.remove("chat-open"),
      () => {
        document.body.classList.remove("chat-open");
      }
    ),
    [isOpen, isMinimized],
  );
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMinimized || !isOpen) return;
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container,
          currentScrollTop = scrollTop,
          isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;
        currentScrollTop < lastScrollTopRef.current - 5
          ? setUserScrolledUp(true)
          : isNearBottom && setUserScrolledUp(false);
        lastScrollTopRef.current = currentScrollTop;
      },
      handleWheel = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = container,
          canScrollUp = scrollTop > 0,
          canScrollDown = scrollTop < scrollHeight - clientHeight;
        (event.deltaY < 0 && !canScrollUp) ||
          (event.deltaY > 0 && !canScrollDown) ||
          event.stopPropagation();
      };
    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.innerWidth >= 768 &&
      container.addEventListener("wheel", handleWheel, {
        passive: false,
      });
    const handleTouchMove = (event) => {
      const target = event.target;
      container && container.contains(target) && event.stopPropagation();
    };
    window.innerWidth < 768 &&
      document.body.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
      document.body.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen, isMinimized]);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsInitializing(true);
      const timeoutId = setTimeout(() => {
        const welcomeMessage = {
          id: "1",
          text: t.aiAssistant.welcomeMessage,
          sender: "assistant",
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setIsInitializing(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, messages.length]);
  useEffect(() => {
    const handleOpenAssistant = () => {
      setIsOpen(true);
    };
    window.addEventListener("openAIAssistant", handleOpenAssistant);
    return () => window.removeEventListener("openAIAssistant", handleOpenAssistant);
  }, []);
  const sendMessage = async (messageText = inputValue) => {
      if (!messageText.trim() || isLoading) return;
      const userMessage = {
        id: Date.now().toString(),
        text: messageText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);
      setUserScrolledUp(false);
      setTimeout(() => {
        const container = containerRef.current;
        container &&
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
      }, 50);
      try {
        const history = messages.map((message) => ({
            role: message.sender === "user" ? "user" : "assistant",
            content: message.text,
          })),
          response = await fetch("https://portfolio-chat-assist.vercel.app/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: messageText,
              history: history,
              context:
                "You are an AI assistant for Shinobi Coder's portfolio. Help visitors learn about my skills, projects, work experience, and professional background. Be helpful, professional, and engaging." +
                (language === "ja" ? " Respond in Japanese." : " Respond in English."),
            }),
          });
        if (!response.ok) throw new Error("Failed to get response");
        const contentType = response.headers.get("Content-Type") || "",
          assistantMessageId = (Date.now() + 1).toString();
        if (!response.body || !response.body.getReader) {
          let replyText = "";
          if (contentType.includes("application/json")) {
            const data = await response.json();
            replyText =
              typeof data == "string" ? data : data.text || data.message || JSON.stringify(data);
          } else replyText = await response.text();
          const assistantMessage = {
            id: assistantMessageId,
            text: replyText,
            sender: "assistant",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setIsLoading(false);
          return;
        }
        try {
          new Audio("/sound.mp3").play().catch((error) => console.log("Audio play failed:", error));
        } catch (error) {
          console.error("Error initializing audio:", error);
        }
        const reader = response.body.getReader(),
          decoder = new TextDecoder();
        let accumulatedText = "",
          isFirstChunk = true;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, {
            stream: true,
          });
          if (((accumulatedText += chunk), isFirstChunk)) {
            isFirstChunk = false;
            setIsLoading(false);
            const streamedMessage = {
              id: assistantMessageId,
              text: accumulatedText,
              sender: "assistant",
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, streamedMessage]);
          } else
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessageId
                  ? {
                      ...message,
                      text: accumulatedText,
                    }
                  : message,
              ),
            );
        }
      } catch (error) {
        console.error("Error sending message:", error);
        const fallbackId = (Date.now() + 1).toString(),
          fallbackText = getLocalReply(messageText),
          fallbackMessage = {
            id: fallbackId,
            text: fallbackText,
            sender: "assistant",
            timestamp: new Date(),
          };
        setMessages((prev) => [...prev, fallbackMessage]);
        setIsLoading(false);
        setTimeout(() => {
          const container = containerRef.current;
          container &&
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "smooth",
            });
        }, 100);
      }
    },
    handleKeyPress = (event) => {
      event.key === "Enter" && !event.shiftKey && (event.preventDefault(), sendMessage(inputValue));
    },
    formatTime = (date) =>
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    renderMessageText = (text) =>
      text
        .replace(/^- (.+)$/gm, "• $1")
        .replace(
          /\n- (.+)/g,
          `
• $1`,
        )
        .replace(/(\s)- (.+)/g, "$1• $2")
        .split(
          `
`,
        )
        .map((line, index) => {
          if (line.startsWith("• ")) {
            const bulletText = line.substring(2);
            return (
              <div className="flex gap-3 my-2" key={index}>
                <span className="text-green-600 dark:text-green-400 font-bold text-sm mt-0.5 flex-shrink-0 w-3">
                  •
                </span>
                <div className="flex-1 text-sm leading-relaxed">{renderInlineText(bulletText)}</div>
              </div>
            );
          } else if (line.match(/^####\s(.+)/)) {
            const headingText = line.replace(/^####\s/, "");
            return (
              <h4
                className="text-base font-bold text-gray-900 dark:text-white mt-3 mb-1 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                key={index}
              >
                {headingText}
              </h4>
            );
          } else if (line.match(/^###\s(.+)/)) {
            const headingText = line.replace(/^###\s/, "");
            return (
              <h3
                className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] border-b border-gray-200 dark:border-gray-600 pb-1"
                key={index}
              >
                {headingText}
              </h3>
            );
          } else if (line.match(/^##\s(.+)/)) {
            const headingText = line.replace(/^##\s/, "");
            return (
              <h2
                className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                key={index}
              >
                {headingText}
              </h2>
            );
          } else if (line.match(/^#\s(.+)/)) {
            const headingText = line.replace(/^#\s/, "");
            return (
              <h1
                className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-3 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                key={index}
              >
                {headingText}
              </h1>
            );
          } else
            return line.trim() === "" ? (
              <br key={index} />
            ) : (
              <div className="text-sm leading-relaxed my-1" key={index}>
                {renderInlineText(line)}
              </div>
            );
        }),
    renderInlineText = (text) =>
      text
        .replace(/^- (.+)/, "• $1")
        .replace(/\s- (.+)/g, " • $1")
        .split(
          /(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s)]+|\[[^\]]+\]\([^)]+\)|\([^)]*https?:\/\/[^)]+\))/g,
        )
        .map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**"))
            return (
              <strong
                className="font-semibold font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                key={index}
              >
                {part.slice(2, -2)}
              </strong>
            );
          if (part.startsWith("*") && part.endsWith("*"))
            return (
              <em
                className="italic font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                key={index}
              >
                {part.slice(1, -1)}
              </em>
            );
          if (part.match(/^https?:\/\/[^\s)]+$/)) {
            const displayUrl = part.length > 50 ? part.substring(0, 50) + "..." : part;
            return (
              <a
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline hover:no-underline transition-all duration-200 font-medium font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                title={`Visit: ${part}`}
                key={index}
              >
                {displayUrl}
              </a>
            );
          } else if (part.match(/^\[[^\]]+\]\([^)]+\)$/)) {
            const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
              const [, linkText, linkUrl] = linkMatch;
              return (
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline hover:no-underline transition-all duration-200 font-medium font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                  title={`Visit: ${linkUrl}`}
                  key={index}
                >
                  {linkText}
                </a>
              );
            }
          } else if (part.match(/^\([^)]*https?:\/\/[^)]+\)$/)) {
            const urlMatch = part.match(/\((https?:\/\/[^)]+)\)/);
            if (urlMatch) {
              const url = urlMatch[1],
                displayUrl = url.length > 40 ? url.substring(0, 40) + "..." : url;
              return (
                <span
                  className="font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]"
                  key={index}
                >
                  (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 underline hover:no-underline transition-all duration-200 font-medium"
                    title={`Visit: ${url}`}
                  >
                    {displayUrl}
                  </a>
                  )
                </span>
              );
            }
          }
          return part;
        });
  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
          <a
            href="https://calendly.com/shinobi-coder701/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group icon-shine mb-7 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-green-300 dark:hover:border-green-500 transition-all duration-200 backdrop-blur-sm"
            aria-label="Schedule a meeting"
            title="Schedule a meeting"
          >
            <CalendarDays className="h-5 w-5 text-green-600 dark:text-green-400 md:h-6 md:w-6" />
          </a>
          <button
            type="button"
            onClick={onOpenPhone}
            className="relative group icon-shine mb-7 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-green-300 dark:hover:border-green-500 transition-all duration-200 backdrop-blur-sm"
            aria-label="Open phone portfolio"
          >
            <Phone className="h-5 w-5 text-green-600 dark:text-green-400 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="relative group icon-shine bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:shadow-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-green-300 dark:hover:border-green-500 transition-all duration-200 backdrop-blur-sm"
            aria-label="Open AI Assistant"
          >
            <img
              src="/img/bot.jpg"
              alt="AI Assistant Robot"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </button>
        </div>
      )}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white/70 dark:bg-gray-900/90 backdrop-blur-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] isolate overflow-hidden flex flex-col ${isMinimized ? "bottom-4 right-4 md:bottom-6 md:right-6 w-80 h-16 rounded-2xl" : "inset-0 md:inset-auto md:bottom-6 md:right-6 w-full h-[100dvh] md:w-[28rem] md:h-[40rem] rounded-none md:rounded-2xl"}`}
          style={{
            WebkitTransform: "translateZ(0)",
            WebkitBackdropFilter: "blur(16px)",
            backdropFilter: "blur(16px)",
          }}
          onClick={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between p-3 border-b border-green-500/20 dark:border-green-400/20 bg-gradient-to-r from-green-500 via-green-600 to-yellow-600 rounded-none md:rounded-t-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
            <div className="flex items-center gap-2.5">
              <div className="relative icon-shine">
                <div className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/img/bot.jpg"
                    alt="AI Assistant"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-green-500 animate-ping" />
              </div>
              <div>
                <h3 className="font-semibold text-white font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] text-[15px]">
                  AI Assistant
                </h3>
                <p className="text-xs text-green-100 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                  Ready to help • Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setMessages([]);
                  localStorage.removeItem("ai-assistant-messages");
                  setInputValue("");
                  setIsLoading(false);
                  setUserScrolledUp(false);
                  setIsInitializing(true);
                  setTimeout(() => {
                    const welcomeMessage = {
                      id: "1",
                      text: t.aiAssistant.welcomeMessage,
                      sender: "assistant",
                      timestamp: new Date(),
                    };
                    setMessages([welcomeMessage]);
                    setIsInitializing(false);
                  }, 500);
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Clear chat history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                aria-label="Close"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain scroll-smooth chat-container"
                style={{
                  WebkitOverflowScrolling: "touch",
                  transform: "translateZ(0)",
                  minHeight: 0,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                {messages.map((message) => (
                  <div
                    className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    key={message.id}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${message.sender === "user" ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-green-600 to-yellow-600"}`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <img
                          src="/img/bot.jpg"
                          alt="AI Assistant"
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div
                      className={`flex flex-col ${message.sender === "user" ? "max-w-[80%] items-end" : "max-w-[85%] items-start"}`}
                    >
                      <div
                        className={`px-3 py-1 rounded-2xl break-words ${message.sender === "user" ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-md" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"}`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          {renderMessageText(message.text)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-yellow-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/img/bot.jpg"
                        alt="AI Assistant"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {isInitializing && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-yellow-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src="/img/bot.jpg"
                        alt="AI Assistant"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif]">
                          Initializing AI Assistant...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-3 md:p-4 border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <div className="mb-3 space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-1">
                    Quick questions:
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        onClick={() => {
                          var input;
                          setInputValue(question);
                          (input = inputRef.current) == null || input.focus();
                        }}
                        className="flex-shrink-0 snap-start bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 transition-colors duration-200 whitespace-nowrap font-medium"
                        key={index}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="🧠 Ask Me Anything!"
                    className="flex-1 min-w-0 px-3 md:px-4 py-2 border border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-['Inter',_'Segoe_UI',_'SF_Pro_Display',_system-ui,_sans-serif] text-base"
                    style={{
                      fontSize: "16px",
                    }}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim() || isLoading}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex items-center justify-center"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
