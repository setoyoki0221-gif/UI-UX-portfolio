import { Children, cloneElement, forwardRef, isValidElement, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

export const Dock = forwardRef(
  (
    {
      className,
      children,
      iconSize = 40,
      iconMagnification = 60,
      iconDistance = 140,
      direction = "middle",
      disableMagnification = false,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(1 / 0),
      renderChildren = () =>
        Children.map(children, (child) =>
          isValidElement(child) && child.type === DockIcon
            ? cloneElement(child, {
                mouseX: mouseX,
                size: iconSize,
                magnification: iconMagnification,
                distance: iconDistance,
              })
            : child,
        );
    return (
      <motion.div
        ref={ref}
        onMouseMove={(event) => {
          disableMagnification || mouseX.set(event.pageX);
        }}
        onMouseLeave={() => mouseX.set(1 / 0)}
        className={cn(
          "mx-auto flex h-[68px] w-max gap-4 rounded-3xl px-5 py-3 macos-nav-container",
          {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          },
          className,
        )}
        style={{
          overflow: "visible",
        }}
        {...props}
      >
        {renderChildren()}
      </motion.div>
    );
  },
);
Dock.displayName = "Dock";

export const DockIcon = forwardRef(
  (
    {
      size = 40,
      magnification = 160,
      distance = 440,
      mouseX,
      className,
      children,
      onClick,
      tooltip,
      ...props
    },
    ref,
  ) => {
    const iconRef = useRef(null),
      distanceFromMouse = useTransform(mouseX, (mouseValue) => {
        var element;
        const bounds = ((element = iconRef.current) == null
          ? void 0
          : element.getBoundingClientRect()) ?? {
          x: 0,
          width: 0,
        };
        return mouseValue - bounds.x - bounds.width / 2;
      }),
      targetWidth = useTransform(
        distanceFromMouse,
        [-distance, 0, distance],
        [size, magnification, size],
      ),
      animatedWidth = useSpring(targetWidth, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
      });
    return (
      <div className="relative group">
        <motion.div
          ref={(node) => {
            iconRef.current = node;
            typeof ref == "function" ? ref(node) : ref && (ref.current = node);
          }}
          style={{
            width: animatedWidth,
          }}
          className={cn(
            "flex aspect-square cursor-pointer items-center justify-center rounded-full nav-item-compact transition-all duration-300 shadow-lg",
            className,
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </motion.div>
        {tooltip && (
          <div className="invisible group-hover:visible absolute left-1/2 transform -translate-x-1/2 top-full mt-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded whitespace-nowrap z-[9999] opacity-0 group-hover:opacity-100 transition-all duration-200">
            {tooltip}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[4px] border-transparent border-b-gray-900 dark:border-b-white" />
          </div>
        )}
      </div>
    );
  },
);
DockIcon.displayName = "DockIcon";
