const iconGradients = {
  peach: {
    gradient: "bg-gradient-to-br from-[#FFD4C3] to-[#FFBFA8]",
  },
  coral: {
    gradient: "bg-gradient-to-br from-[#FFB8B8] to-[#FFA0A0]",
  },
  yellow: {
    gradient: "bg-gradient-to-br from-[#FFF4C3] to-[#FFE9A0]",
  },
  blue: {
    gradient: "bg-gradient-to-br from-[#C3E0FF] to-[#A8CEFF]",
  },
  lavender: {
    gradient: "bg-gradient-to-br from-[#E0D4FF] to-[#CABFFF]",
  },
  beige: {
    gradient: "bg-gradient-to-br from-[#E8DECA] to-[#D8CCB8]",
  },
};

export function PhoneAppIcon({
  icon: Icon,
  image,
  label,
  color,
  onClick,
  delay = 0,
  size = 62,
  dataTutorial,
}) {
  if (image)
    return (
      <div className="flex flex-col items-center gap-2 relative z-[20]" data-tutorial={dataTutorial}>
        <button onClick={onClick} className="transition-all duration-200 active:scale-90 hover:scale-105">
          <img
            src={image}
            alt={label}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "22%",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />
        </button>
        <span
          className="text-[11px] max-w-[70px] text-center truncate font-medium"
          style={{
            color: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          {label}
        </span>
      </div>
    );
  const gradientStyle = iconGradients[color || "blue"];
  return (
    <div className="flex flex-col items-center gap-2 relative z-[20]" data-tutorial={dataTutorial}>
      <button
        onClick={onClick}
        className={`${gradientStyle.gradient} flex items-center justify-center transition-all duration-200 active:scale-90 hover:scale-105 border border-white/10`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "22%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {Icon && <Icon className="w-7 h-7 text-white stroke-[2.5]" />}
      </button>
      <span
        className="text-[11px] max-w-[70px] text-center truncate font-medium"
        style={{
          color: "white",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

const iconSurfaceStyles = {
  peach: {
    gradient: "bg-gradient-to-br from-[#FFD4C3] to-[#FFBFA8]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
  coral: {
    gradient: "bg-gradient-to-br from-[#FFB8B8] to-[#FFA0A0]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
  yellow: {
    gradient: "bg-gradient-to-br from-[#FFF4C3] to-[#FFE9A0]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
  blue: {
    gradient: "bg-gradient-to-br from-[#C3E0FF] to-[#A8CEFF]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
  lavender: {
    gradient: "bg-gradient-to-br from-[#E0D4FF] to-[#CABFFF]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
  beige: {
    gradient: "bg-gradient-to-br from-[#E8DECA] to-[#D8CCB8]",
    shadow:
      "shadow-[7px_7px_14px_rgba(0,0,0,0.1),-5px_-5px_12px_rgba(255,255,255,0.95),inset_0_1px_3px_rgba(255,255,255,0.6),inset_0_-1px_3px_rgba(0,0,0,0.06)]",
  },
};

export function DockAppIcon({ icon: Icon, image, label, color, onClick }) {
  if (image) {
    const iconSize = "62px";
    return (
      <button
        onClick={onClick}
        className="transition-all duration-200 active:scale-90 hover:scale-105"
        style={{
          flexShrink: 0,
        }}
      >
        <img
          src={image}
          alt={label || ""}
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: "22%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        />
      </button>
    );
  }
  const surfaceStyle = iconSurfaceStyles[color || "blue"];
  return (
    <button
      onClick={onClick}
      className={`w-[62px] h-[62px] rounded-2xl ${surfaceStyle.gradient} ${surfaceStyle.shadow} flex items-center justify-center transition-all duration-200 active:scale-90 active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.12),inset_-3px_-3px_8px_rgba(255,255,255,0.5)] hover:scale-110`}
    >
      {Icon && <Icon className="w-7 h-7 text-white stroke-[3]" />}
    </button>
  );
}
