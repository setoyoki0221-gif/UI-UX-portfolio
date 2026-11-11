import { useState } from "react";
import { ExternalLink, Filter, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { getTechIcon } from "@/lib/techIcons";

export function Projects() {
  const { language, t } = useLanguage(),
    [selectedCategory, setSelectedCategory] = useState("All"),
    [hoveredTech, setHoveredTech] = useState(null),
    [showAll, setShowAll] = useState(false),
    categories = ["All", "AI", "ML", "Web Dev", "Full Stack", "Mobile", "3D"],
    filteredProjects =
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);
  return (
    <section id="projects" className="py-12 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent btn-shine relative">
              {t.projects.heading}
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-yellow-500 mt-0.5 mx-auto opacity-60" />
            </div>
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-green-500 rounded-full opacity-60" />
            </div>
            <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-60" />
            </div>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            {t.projects.tagline}
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t.projects.filterBy}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category ? "bg-green-600 text-white shadow-lg" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                key={category}
              >
                {t.projects.categories[category]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {(showAll ? filteredProjects : filteredProjects.slice(0, 7)).map((project, index) => (
            <div
              className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg group h-full flex flex-col project-card ${project.isLatest ? "ring-2 ring-green-500 shadow-green-500/20 lg:col-span-3 lg:grid lg:grid-cols-[6fr_4fr] lg:items-stretch" : ""}`}
              key={`${project.title}-${project.category}`}
            >
              <div
                className={`relative overflow-hidden project-card-content ${project.isLatest ? "lg:h-[400px]" : ""}`}
              >
                <img
                  src={project.isLatest && project.teamPhoto ? project.teamPhoto : project.image}
                  alt={project.isLatest ? "Project team" : project.title}
                  className={`w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${project.isLatest ? "h-full min-h-[320px] object-contain bg-gray-100 dark:bg-gray-800 lg:min-h-0" : "h-48"}`}
                  onError={(event) => {
                    console.error(`Failed to load image for ${project.title}:`, project.image);
                    event.currentTarget.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f3f4f6"/><text x="200" y="100" text-anchor="middle" dominant-baseline="middle" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Image not found</text></svg>';
                  }}
                  loading={index < 3 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
                {project.isLatest && (
                  <span className="absolute top-2 left-2 px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full shadow-lg">
                    Latest Work
                  </span>
                )}
                {!project.isLatest && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.github}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-6 h-6 text-gray-900" />
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        aria-label={
                          project.liveIsReference ? "View Reference Site" : "View Live Demo"
                        }
                      >
                        <ExternalLink className="w-6 h-6 text-gray-900" />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col project-card-content">
                {project.isLatest && (
                  <div className="group/project-image relative -mx-6 -mt-6 mb-4 w-[calc(100%+3rem)]">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="block h-40 w-full max-w-none rounded-none object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover/project-image:opacity-100">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-2 transition-colors hover:bg-gray-100"
                        aria-label="View latest project on GitHub"
                      >
                        <Github className="h-6 w-6 text-gray-900" />
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">
                    {language === "ja" ? project.titleJa : project.title}
                  </h3>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 ${project.liveIsReference ? "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800 text-yellow-700 dark:text-yellow-300" : "bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300"}`}
                      aria-label={
                        project.liveIsReference ? "View Reference Site" : "View Live Demo"
                      }
                    >
                      <ExternalLink className="w-3 h-3" />
                      {project.liveIsReference ? t.projects.reference : t.projects.live}
                    </a>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-1">
                  {language === "ja" ? project.descriptionJa : project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.technologies.map((tech, techIndex) => {
                    const tooltipKey = `${project.title}-${tech}-${techIndex}`,
                      isHovered = hoveredTech === tooltipKey;
                    return (
                      <div
                        className="relative flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-800/30 transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setHoveredTech(tooltipKey)}
                        onMouseLeave={() => setHoveredTech(null)}
                        key={tooltipKey}
                      >
                        {getTechIcon(tech)}
                        {isHovered && (
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-lg whitespace-nowrap z-[100] animate-in fade-in slide-in-from-bottom-1 duration-200">
                            {tech}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-black dark:border-t-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length > 7 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll((isShown) => !isShown)}
              className="px-4 py-2 bg-transparent text-green-600 border border-green-600 rounded-md hover:bg-green-200 hover:text-green-700 dark:border-white dark:text-white dark:hover:bg-gray-500"
            >
              {showAll ? t.projects.showLess : t.projects.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
