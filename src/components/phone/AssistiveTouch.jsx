import { useEffect, useRef, useState } from "react";

export function AssistiveTouch({ onLock }) {
  const [position, setPosition] = useState({
      x: 300,
      y: 400,
    }),
    [isDragging, setIsDragging] = useState(false),
    dragOffsetRef = useRef({
      x: 0,
      y: 0,
    }),
    lastTapRef = useRef(0),
    containerRef = useRef(null),
    handleClick = () => {
      const now = Date.now();
      now - lastTapRef.current < 300 && onLock();
      lastTapRef.current = now;
    },
    handleTouchStart = (event) => {
      var containerElement, parentElement;
      event.stopPropagation();
      event.preventDefault();
      const touch = event.touches[0],
        parentRect =
          (parentElement = (containerElement = containerRef.current) == null ? void 0 : containerElement.parentElement) == null
            ? void 0
            : parentElement.getBoundingClientRect();
      parentRect &&
        ((dragOffsetRef.current = {
          x: touch.clientX - parentRect.left - position.x,
          y: touch.clientY - parentRect.top - position.y,
        }),
        setIsDragging(true));
    },
    handleTouchMove = (event) => {
      var containerElement, parentElement;
      if (!isDragging) return;
      event.stopPropagation();
      event.preventDefault();
      const touch = event.touches[0],
        parentRect =
          (parentElement = (containerElement = containerRef.current) == null ? void 0 : containerElement.parentElement) == null
            ? void 0
            : parentElement.getBoundingClientRect();
      if (!parentRect) return;
      const newX = touch.clientX - parentRect.left - dragOffsetRef.current.x,
        newY = touch.clientY - parentRect.top - dragOffsetRef.current.y;
      setPosition({
        x: Math.max(0, Math.min(newX, 320)),
        y: Math.max(0, Math.min(newY, 720)),
      });
    },
    handleTouchEnd = () => {
      setIsDragging(false);
    },
    handleMouseDown = (event) => {
      var containerElement, parentElement;
      event.stopPropagation();
      event.preventDefault();
      const parentRect =
        (parentElement = (containerElement = containerRef.current) == null ? void 0 : containerElement.parentElement) == null
          ? void 0
          : parentElement.getBoundingClientRect();
      parentRect &&
        ((dragOffsetRef.current = {
          x: event.clientX - parentRect.left - position.x,
          y: event.clientY - parentRect.top - position.y,
        }),
        setIsDragging(true));
    };
  useEffect(() => {
    const handleMouseMove = (event) => {
        var containerElement, parentElement;
        if (!isDragging) return;
        const parentRect =
          (parentElement = (containerElement = containerRef.current) == null ? void 0 : containerElement.parentElement) == null
            ? void 0
            : parentElement.getBoundingClientRect();
        if (!parentRect) return;
        const newX = event.clientX - parentRect.left - dragOffsetRef.current.x,
          newY = event.clientY - parentRect.top - dragOffsetRef.current.y;
        setPosition({
          x: Math.max(0, Math.min(newX, 320)),
          y: Math.max(0, Math.min(newY, 720)),
        });
      },
      handleMouseUp = () => {
        setIsDragging(false);
      };
    isDragging && (document.addEventListener("mousemove", handleMouseMove), document.addEventListener("mouseup", handleMouseUp));
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return (
    <div
      ref={containerRef}
      data-assistive-touch="true"
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "2px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 9999,
        touchAction: "none",
        userSelect: "none",
        opacity: 1,
        transition: isDragging ? "none" : "transform 0.2s ease",
        transform: isDragging ? "scale(1.1)" : "scale(1)",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      />
    </div>
  );
}
