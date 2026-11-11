import { useEffect, useRef, useState } from "react";

const CursorArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 50 54"
    fill="none"
    className="dark:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
    style={{
      scale: 1,
    }}
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        className="fill-white dark:fill-black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        className="stroke-green-500 dark:stroke-white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1.5} />
        <feGaussianBlur stdDeviation={1.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.23 0 0 0 0 0.51 0 0 0 0 0.96 0 0 0 0.5 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_91_7928" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_91_7928" result="shape" />
      </filter>
    </defs>
  </svg>
);

export function CustomCursor({ cursor = <CursorArrow />, enabled = true }) {
  const [isMobile, setIsMobile] = useState(() =>
      typeof window > "u"
        ? false
        : window.innerWidth <= 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ) ||
          "ontouchstart" in window ||
          window.matchMedia("(pointer: coarse)").matches,
    ),
    cursorRef = useRef(null),
    trailRefs = useRef([]),
    frameRef = useRef(null),
    mousePosition = useRef({
      x: -1e3,
      y: -1e3,
    }),
    trailPoints = useRef(
      Array.from(
        {
          length: 10,
        },
        () => ({
          x: -1e3,
          y: -1e3,
        }),
      ),
    );
  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) ||
        "ontouchstart" in window ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isMobileDevice);
      (isMobileDevice || !enabled) &&
        ((document.documentElement.style.cursor = "auto"), (document.body.style.cursor = "auto"));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [enabled]);
  useEffect(() => {
    if (!enabled || isMobile)
      return (
        document.documentElement.classList.add("native-cursor"),
        (document.documentElement.style.cursor = "auto"),
        (document.body.style.cursor = "auto"),
        () => {
          document.documentElement.classList.remove("native-cursor");
          document.documentElement.style.cursor = "auto";
          document.body.style.cursor = "auto";
        }
      );
    document.documentElement.classList.remove("native-cursor");
    const handleMouseMove = (event) => {
        mousePosition.current = {
          x: event.clientX,
          y: event.clientY,
        };
        cursorRef.current &&
          ((cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) rotate(-22deg) scale(1)`),
          (cursorRef.current.style.opacity = "1"));
      },
      animate = () => {
        let leadX = mousePosition.current.x,
          leadY = mousePosition.current.y;
        trailPoints.current.forEach((point, index) => {
          const easing = 0.15 + index * 0.02;
          point.x += (leadX - point.x) * easing;
          point.y += (leadY - point.y) * easing;
          const dot = trailRefs.current[index];
          dot &&
            ((dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`),
            (dot.style.opacity = `${Math.max(0, 1 - index * 0.12)}`),
            (dot.style.width = `${14 - index}px`),
            (dot.style.height = `${14 - index}px`),
            (dot.style.filter = `blur(${index * 0.35}px)`));
          leadX = point.x;
          leadY = point.y;
        });
        frameRef.current = requestAnimationFrame(animate);
      };
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      frameRef.current && cancelAnimationFrame(frameRef.current);
      document.documentElement.classList.remove("native-cursor");
      document.body.style.cursor = "auto";
    };
  }, [enabled, isMobile]);
  return !enabled || isMobile ? null : (
    <>
      {trailPoints.current.map((_point, index) => (
        <div
          ref={(element) => {
            element && (trailRefs.current[index] = element);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 14,
            height: 14,
            borderRadius: "9999px",
            background: `radial-gradient(circle, rgba(34,197,94,${0.9 - index * 0.06}) 0%, rgba(168,85,247,${0.18 - index * 0.01}) 65%, transparent 100%)`,
            pointerEvents: "none",
            zIndex: 2147483646,
            transform: "translate3d(-1000px, -1000px, 0) translate(-50%, -50%)",
            mixBlendMode: "screen",
            boxShadow: "0 0 40px rgba(74, 222, 128, 0.18)",
            transition: "opacity 0.15s ease-out, width 0.15s ease-out, height 0.15s ease-out",
          }}
          key={index}
        />
      ))}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 2147483647,
          pointerEvents: "none",
          willChange: "transform, opacity",
          transform: "translate3d(0, 0, 0) translate(-50%, -50%) rotate(-22deg) scale(0.9)",
          opacity: 0,
          transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
          filter: "drop-shadow(0 0 30px rgba(34, 197, 94, 0.2))",
        }}
      >
        {cursor}
      </div>
    </>
  );
}
