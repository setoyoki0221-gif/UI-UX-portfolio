import { useMemo } from "react";
import { motion } from "framer-motion";

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ShimmerText({
  children,
  as: tag = "p",
  className,
  style,
  duration = 2,
  spread = 2,
}) {
  const Component = motion.create(tag),
    shimmerSpread = useMemo(() => children.length * spread, [children, spread]);
  return (
    <Component
      className={joinClasses(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#15803d] [--base-gradient-color:#dcfce7]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        "dark:[--base-color:#22c55e] dark:[--base-gradient-color:#86efac] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        className,
      )}
      initial={{
        backgroundPosition: "100% center",
      }}
      animate={{
        backgroundPosition: "0% center",
      }}
      transition={{
        repeat: 1 / 0,
        duration: duration,
        ease: "linear",
      }}
      style={{
        "--spread": `${shimmerSpread}px`,
        backgroundImage: "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
