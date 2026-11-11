import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";
import { isMessageHidden } from "@/lib/moderation";
import { supabase } from "@/lib/supabase";

export function MessagesApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [isVisible, setIsVisible] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [messages, setMessages] = useState([]),
    [draft, setDraft] = useState(""),
    [userName, setUserName] = useState(() => localStorage.getItem("user_name") || ""),
    listRef = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.from("messages").select("*").order("created_at", {
          ascending: true,
        });
        if (data) {
          const sentIds = JSON.parse(localStorage.getItem("my_sent_message_ids") || "[]"),
            visibleMessages = data.filter((row) => !isMessageHidden(row)).map((row) => ({
              id: row.id,
              text: row.text,
              sender: row.sender,
              isUser: sentIds.includes(row.id),
              timestamp: new Date(row.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }));
          setMessages(visibleMessages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    })();
    const channel = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newRow = payload.new,
            sentIds = JSON.parse(localStorage.getItem("my_sent_message_ids") || "[]");
          if (
            isMessageHidden({
              id: Number(newRow.id),
              text: newRow.text,
              sender: newRow.sender,
            })
          )
            return;
          const newMessage = {
            id: newRow.id,
            text: newRow.text,
            sender: newRow.sender,
            isUser: sentIds.includes(newRow.id),
            timestamp: new Date(newRow.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prevMessages) =>
            prevMessages.some((existing) => existing.id === newMessage.id)
              ? prevMessages
              : [...prevMessages, newMessage],
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);
  useEffect(() => {
    listRef.current && (listRef.current.scrollTop = listRef.current.scrollHeight);
  }, [messages]);
  const handleBack = () => {
      onStartClose && onStartClose();
      setIsVisible(false);
      setTimeout(onClose, 300);
    },
    handleSend = async () => {
      if (!draft.trim()) return;
      const text = draft,
        sender = userName.trim() || t.messages.guest;
      if (
        isMessageHidden({
          id: -1,
          text: text,
          sender: sender,
        })
      ) {
        alert("Please keep messages respectful.");
        return;
      }
      setDraft("");
      userName.trim() && localStorage.setItem("user_name", userName.trim());
      const { data, error } = await supabase
        .from("messages")
        .insert([
          {
            text: text,
            sender: sender,
          },
        ])
        .select();
      if (error) {
        console.error("Error sending message:", error);
        alert(`Failed to send message: ${error.message}`);
        return;
      }
      if (data && data.length > 0) {
        const inserted = data[0],
          sentIds = JSON.parse(localStorage.getItem("my_sent_message_ids") || "[]");
        sentIds.push(inserted.id);
        localStorage.setItem("my_sent_message_ids", JSON.stringify(sentIds));
        const newMessage = {
          id: inserted.id,
          text: inserted.text,
          sender: inserted.sender,
          isUser: true,
          timestamp: new Date(inserted.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prevMessages) =>
          prevMessages.some((existing) => existing.id === newMessage.id)
            ? prevMessages
            : [...prevMessages, newMessage],
        );
      }
    },
    handleKeyPress = (event) => {
      event.key === "Enter" && handleSend();
    };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
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
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          zIndex: 20,
          position: "sticky",
          top: 0,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          borderRadius: "3rem 3rem 0 0",
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
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: "17px",
            }}
          >
            {t.apps.messages}
          </span>
        </div>
        <div
          style={{
            width: "48px",
          }}
        />{" "}
      </div>
      <div
        ref={listRef}
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem 1rem 1rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              className="spinner"
              style={{
                width: "32px",
                height: "32px",
                border: "3px solid rgba(0,0,0,0.1)",
                borderTop: "3px solid #007aff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: message.isUser ? "flex-end" : "flex-start",
                  maxWidth: "100%",
                  marginBottom: "4px",
                }}
                key={message.id}
              >
                {!message.isUser && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#8e8e93",
                      marginLeft: "12px",
                      marginBottom: "2px",
                    }}
                  >
                    {message.sender}
                  </span>
                )}
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "18px",
                    backgroundColor: message.isUser ? "#007aff" : "#e9e9eb",
                    color: message.isUser ? "white" : "black",
                    maxWidth: "75%",
                    fontSize: "17px",
                    lineHeight: "1.4",
                    borderBottomRightRadius: message.isUser ? "4px" : "18px",
                    borderBottomLeftRadius: message.isUser ? "18px" : "4px",
                    wordWrap: "break-word",
                    position: "relative",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div
        style={{
          padding: "12px 1rem 2rem 1rem",
          backgroundColor: "white",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder={t.messages.guest}
          style={{
            fontSize: "13px",
            color: "#333",
            padding: "4px 8px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#f2f2f7",
            width: "100%",
            marginBottom: "4px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
              borderRadius: "20px",
              border: "1px solid #c6c6c8",
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.messages.placeholder}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                fontSize: "17px",
                color: "black",
                background: "transparent",
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            style={{
              backgroundColor: draft.trim() ? "#007aff" : "#c6c6c8",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: draft.trim() ? "pointer" : "default",
              transition: "background-color 0.2s",
            }}
          >
            <Send
              size={16}
              fill="white"
              style={{
                marginLeft: "2px",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
