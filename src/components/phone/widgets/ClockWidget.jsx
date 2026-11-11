import { useEffect, useState } from "react";

export function ClockWidget({ onClick, delay = 0 }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1e3);
    return () => clearInterval(intervalId);
  }, []);
  const hours = now.getHours() % 12 || 12,
    minutes = now.getMinutes(),
    seconds = now.getSeconds(),
    secondAngle = seconds * 6 + 90,
    hourAngle = hours * 30 + minutes * 0.5 + 90,
    minuteAngle = minutes * 6 + seconds * 0.1 + 90;
  return (
    <div
      className="flex flex-col items-center gap-2 relative z-[20]"
      style={{
        animationDelay: `${delay}ms`,
        gridColumn: "span 2",
        gridRow: "span 1",
      }}
    >
      <button
        onClick={onClick}
        className="relative"
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "22%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
          padding: 0,
          background: "#1c1c1e",
          border: "none",
          overflow: "visible",
          cursor: "default",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hourLabel, index) => {
            const angle = index * 30 - 90,
              radius = 45,
              offsetX = Math.cos((angle * Math.PI) / 180) * radius,
              offsetY = Math.sin((angle * Math.PI) / 180) * radius;
            return (
              <span
                style={{
                  position: "absolute",
                  left: `calc(50% + ${offsetX}px)`,
                  top: `calc(50% + ${offsetY}px)`,
                  transform: "translate(-50%, -50%)",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#000",
                }}
                key={hourLabel}
              >
                {hourLabel}
              </span>
            );
          })}
          <div
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#000",
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "28px",
              height: "4px",
              background: "#000",
              transformOrigin: "right center",
              transform: `rotate(${hourAngle}deg)`,
              right: "50%",
              borderRadius: "2px",
              transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "48px",
              height: "4px",
              background: "#000",
              transformOrigin: "right center",
              transform: `rotate(${minuteAngle}deg)`,
              right: "50%",
              borderRadius: "2px",
              transition: "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "52px",
              height: "2px",
              background: "#ff3b30",
              transformOrigin: "right center",
              transform: `rotate(${secondAngle}deg)`,
              right: "50%",
              transition: "transform 0.05s linear",
            }}
          />
        </div>
      </button>
      <span
        className="text-[11px] max-w-[140px] text-center truncate font-medium"
        style={{
          color: "white",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Clock
      </span>
    </div>
  );
}
