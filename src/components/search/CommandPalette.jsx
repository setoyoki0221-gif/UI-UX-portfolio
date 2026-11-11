import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  Code,
  FileText,
  Hash,
  Mail,
  Search,
  User,
  X as CloseIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export const CommandPalette = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage(),
    [query, setQuery] = useState(""),
    [selectedIndex, setSelectedIndex] = useState(0),
    listRef = useRef(null),
    itemRefs = useRef([]),
    allCommands = useMemo(() => {
      const items = [];
      items.push({
        type: "assistant",
        title: t.search.assistantTitle,
        description: t.search.assistantDescription,
        icon: <Bot className="w-4 h-4" />,
        action: () => {
          window.dispatchEvent(new CustomEvent("openAIAssistant"));
          onClose();
        },
      });
      items.push({
        type: "mail",
        title: t.contact.emailLabel,
        description: t.search.sendEmailDescription,
        icon: <Mail className="w-4 h-4" />,
        action: () => {
          window.open("mailto:setoyoki0221@gmail.com", "_blank");
          onClose();
        },
      });
      [
        {
          name: t.nav.home,
          id: "home",
          icon: <User className="w-4 h-4" />,
        },
        {
          name: t.nav.about,
          id: "about",
          icon: <User className="w-4 h-4" />,
        },
        {
          name: t.nav.skills,
          id: "skills",
          icon: <Code className="w-4 h-4" />,
        },
        {
          name: t.nav.experience,
          id: "education",
          icon: <Briefcase className="w-4 h-4" />,
        },
        {
          name: t.nav.projects,
          id: "projects",
          icon: <Hash className="w-4 h-4" />,
        },
        {
          name: t.nav.contact,
          id: "contact",
          icon: <User className="w-4 h-4" />,
        },
      ].forEach((section) => {
        items.push({
          type: "section",
          title: section.name,
          description: t.search.navigateTo.replace("{section}", section.name),
          icon: section.icon,
          action: () => {
            var element;
            (element = document.getElementById(section.id)) == null ||
              element.scrollIntoView({
                behavior: "smooth",
              });
            onClose();
          },
        });
      });
      projects.forEach((project) => {
        items.push({
          type: "project",
          title: language === "ja" ? project.titleJa : project.title,
          description: language === "ja" ? project.descriptionJa : project.description,
          category: project.category,
          url: project.live,
          icon: <Hash className="w-4 h-4" />,
          action: () => {
            project.live && window.open(project.live, "_blank");
            onClose();
          },
        });
      });
      experience.forEach((job) => {
        items.push({
          type: "education",
          title: language === "ja" ? job.roleJa : job.role,
          description: [
            language === "ja" ? job.companyJa : job.company,
            language === "ja" ? job.durationJa : job.duration,
          ]
            .filter(Boolean)
            .join(" • "),
          icon: <FileText className="w-4 h-4" />,
          action: () => {
            var element;
            (element = document.getElementById("education")) == null ||
              element.scrollIntoView({
                behavior: "smooth",
              });
            onClose();
          },
        });
      });
      const technologies = new Set();
      projects.forEach((project) => {
        project.technologies.forEach((technology) => technologies.add(technology));
      });
      Array.from(technologies).forEach((technology) => {
        items.push({
          type: "skill",
          title: technology,
          description: t.search.technologySkill,
          icon: <Code className="w-4 h-4" />,
          action: () => {
            var element;
            (element = document.getElementById("skills")) == null ||
              element.scrollIntoView({
                behavior: "smooth",
              });
            onClose();
          },
        });
      });
      return items;
    }, [onClose, language, t]),
    filteredCommands = useMemo(() => {
      if (!query.trim()) return allCommands.slice(0, 8);
      const terms = query.toLowerCase().split(" ");
      return allCommands
        .filter((command) => {
          const haystack =
            `${command.title} ${command.description} ${command.category}`.toLowerCase();
          return terms.every((term) => haystack.includes(term));
        })
        .slice(0, 8);
    }, [query, allCommands]);
  useEffect(() => {
    setSelectedIndex(0);
    itemRefs.current = new Array(filteredCommands.length).fill(null);
  }, [filteredCommands]);
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      var selected;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((index) => Math.min(index + 1, filteredCommands.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((index) => Math.max(index - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          (selected = filteredCommands[selectedIndex]) != null &&
            selected.action &&
            filteredCommands[selectedIndex].action();
          break;
        case "Escape":
          event.preventDefault();
          onClose();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);
  useEffect(() => {
    if (!isOpen || filteredCommands.length === 0) return;
    const selectedItem = itemRefs.current[selectedIndex];
    if (selectedItem && listRef.current) {
      const container = listRef.current,
        itemRect = selectedItem.getBoundingClientRect(),
        containerRect = container.getBoundingClientRect();
      itemRect.bottom > containerRect.bottom
        ? selectedItem.scrollIntoView({
            behavior: "smooth",
            block: "end",
          })
        : itemRect.top < containerRect.top &&
          selectedItem.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
    }
  }, [selectedIndex, isOpen, filteredCommands.length]);
  useEffect(() => {
    isOpen || (setQuery(""), setSelectedIndex(0));
  }, [isOpen]);
  const getTypeBadgeClasses = (type) => {
    switch (type) {
      case "project":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "education":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      case "skill":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
      case "assistant":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "internship":
        return "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300";
      case "action":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "mail":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      case "section":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: -20,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              scale: {
                type: "spring",
                damping: 20,
                stiffness: 300,
              },
            }}
            className="w-full max-w-2xl mx-auto pointer-events-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                }}
                className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t.search.placeholder}
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <CloseIcon className="w-4 h-4 text-gray-400" />
                </button>
              </motion.div>
              <div ref={listRef} className="max-h-96 overflow-y-auto">
                {filteredCommands.length > 0 ? (
                  <motion.div
                    className="p-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.03,
                        },
                      },
                    }}
                  >
                    {filteredCommands.map((command, index) => (
                      <motion.div
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -20,
                            scale: 0.95,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 24,
                            },
                          },
                        }}
                        key={`${command.type}-${command.title}-${index}`}
                      >
                        <button
                          ref={(element) => (itemRefs.current[index] = element)}
                          onClick={command.action}
                          className={`w-full text-left p-3 rounded-md flex items-center space-x-3 transition-colors ${index === selectedIndex ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"}`}
                        >
                          <div className="flex-shrink-0">{command.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {command.title}
                              </p>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeClasses(command.type)}`}
                              >
                                {command.type}
                              </span>
                            </div>
                            {command.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {command.description}
                              </p>
                            )}
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    </motion.div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {query ? t.search.noResults : t.search.startTyping}
                    </p>
                  </motion.div>
                )}
              </div>
              {filteredCommands.length > 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                  className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{t.search.hint}</span>
                    <span>
                      {filteredCommands.length} {t.search.results}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
