import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";
import { projects } from "@/data/projects";

export function ProjectsWidget() {
  const { language } = useLanguage(),
    phoneText = getPhoneText(language),
    [hoveredIndex, setHoveredIndex] = useState(null),
    accentColors = ["#22c55e", "#eab308", "#06b6d4", "#8b5cf6", "#f97316"];
  return (
    <div
      style={{
        gridColumn: "span 4",
        width: "auto",
        maxWidth: "340px",
        marginLeft: "30px",
        background: "transparent",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        borderRadius: "24px",
        padding: "14px",
        border: "none",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          paddingLeft: "4px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#000000",
            margin: 0,
            letterSpacing: "0.3px",
            textTransform: "uppercase",
          }}
        >
          {phoneText.projects.heading}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "410px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "2px 6px 2px 0",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(15, 23, 42, 0.55) transparent",
        }}
      >
        {projects.map((project, index) => {
          const accent = accentColors[index % accentColors.length],
            title = language === "ja" ? project.titleJa : project.title,
            description = language === "ja" ? project.descriptionJa : project.description,
            link = project.live ?? project.github;
          return (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                gap: "10px",
                background:
                  hoveredIndex === index ? "rgba(30, 41, 59, 0.95)" : "rgba(15, 23, 42, 0.9)",
                borderRadius: "14px",
                padding: "10px",
                border:
                  hoveredIndex === index
                    ? `1.5px solid ${accent}60`
                    : "1.5px solid rgba(255, 255, 255, 0.15)",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                textDecoration: "none",
                transform: hoveredIndex === index ? "scale(1.02)" : "scale(1)",
                boxShadow:
                  hoveredIndex === index
                    ? `0 8px 24px ${accent}40, 0 0 0 1px ${accent}20`
                    : "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
              key={`${project.title}-${project.category}`}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "12px",
                  background: project.image
                    ? "white"
                    : `linear-gradient(135deg, ${accent}50, ${accent}30)`,
                  border: `1.5px solid ${accent}40`,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: 900,
                  color: accent,
                  overflow: "hidden",
                  transition: "transform 0.2s ease",
                  transform: hoveredIndex === index ? "rotate(-5deg)" : "rotate(0deg)",
                  padding: project.image ? "8px" : "0",
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  index + 1
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "rgba(255, 255, 255, 0.4)",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </div>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "white",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.3,
                  }}
                >
                  {description}
                </p>
              </div>
              {link && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    opacity: hoveredIndex === index ? 1 : 0.3,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <ExternalLink
                    size={14}
                    style={{
                      color: accent,
                      strokeWidth: 2.5,
                    }}
                  />
                </div>
              )}
            </a>
          );
        })}
      </div>
      <div
        style={{
          marginTop: "2px",
          paddingTop: "8px",
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <a
          href="https://github.com/shinobi-coder701"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "10px",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "11px",
            fontWeight: 700,
            textDecoration: "none",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            transition: "all 0.2s ease",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            event.currentTarget.style.color = "white";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            event.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
          }}
        >
          {phoneText.projects.viewAll}
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}
