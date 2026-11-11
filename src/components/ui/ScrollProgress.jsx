import { useCallback, useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0),
    updateProgress = useCallback(() => {
      const scrollTop = document.documentElement.scrollTop,
        scrollableHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight,
        percent = (scrollTop / scrollableHeight) * 100;
      setProgress(percent);
    }, []);
  useEffect(
    () => (
      updateProgress(),
      window.addEventListener("scroll", updateProgress, {
        passive: true,
      }),
      () => window.removeEventListener("scroll", updateProgress)
    ),
    [updateProgress],
  );
  return (
    <>
      <div
        className="fixed left-0 h-1 bg-gradient-to-r from-pink-500 via-pink-400 to-green-500 z-50"
        style={{
          width: `${progress}%`,
          top: "0",
          zIndex: 100,
          transition: "none",
        }}
      />
      <style>{`
          @media (max-width: 768px) {
            .progress-bar {
              top: 4rem; /* Adjust for mobile if navbar or other element is causing overlap */
              z-index: 100; /* Ensure the progress bar appears above other elements */
            }
          }
        `}</style>
    </>
  );
};
