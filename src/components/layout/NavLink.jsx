export function NavLink({
  href,
  icon,
  label,
  download = false,
  target,
  onClick,
  isActive = false,
  className = "",
}) {
  const isAnchor = href.startsWith("#"),
    handleClick = (event) => {
      if (isAnchor) {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        targetElement &&
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
      }
      onClick && onClick();
    };
  return (
    <a
      href={href}
      onClick={handleClick}
      {...(download
        ? {
            download: true,
          }
        : {})}
      {...(target
        ? {
            target: target,
          }
        : {})}
      className={`p-2 rounded-xl transition-all duration-200 group relative flex items-center hover:scale-105 ${className != null && className.includes("justify-start") ? "justify-start" : "justify-center"} ${isActive ? "bg-gradient-to-r from-green-500 to-yellow-600 text-white shadow-lg shadow-green-500/25" : "hover:bg-white/10 dark:hover:bg-gray-700/50"} ${className}`}
      aria-label={label}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ${isActive ? "drop-shadow-md" : ""} ${className != null && className.includes("justify-start") ? "mr-3" : ""}`}
      >
        {icon}
      </div>
      <span
        className={`${className != null && className.includes("justify-start") ? "block" : "md:hidden"} text-sm font-medium transition-all duration-300 ${className != null && className.includes("justify-start") ? "" : "ml-3"} ${isActive ? "text-white font-semibold" : "text-gray-700 dark:text-gray-200"}`}
      >
        {label}
      </span>
    </a>
  );
}
