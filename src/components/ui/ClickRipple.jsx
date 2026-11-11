import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const ClickRipple = () => {
  const [ripples, setRipples] = useState([]),
    [nextId, setNextId] = useState(0),
    handleClick = useCallback(
      (event) => {
        if (
          event.target.closest(
            'input, textarea, button, a, select, [role="button"], [contenteditable]',
          )
        )
          return;
        const ripple = {
          id: nextId,
          x: event.clientX,
          y: event.clientY,
        };
        setRipples((prev) => [...prev, ripple]);
        setNextId((prev) => prev + 1);
        setTimeout(() => {
          setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
        }, 1e3);
      },
      [nextId],
    );
  useEffect(() => {
    const handleDocumentClick = (event) => handleClick(event),
      handleWindowClick = (event) => handleClick(event);
    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("click", handleWindowClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("click", handleWindowClick, true);
    };
  }, [handleClick]);
  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            className="absolute"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{
              scale: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: 2.3,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            key={ripple.id}
          >
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-gray-800/80 dark:border-white/80 bg-gray-200/20 dark:bg-white/10" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
