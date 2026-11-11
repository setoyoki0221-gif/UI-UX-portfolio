import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bot, Cloud, Code2, GitBranch, Search, TrendingUp } from "lucide-react";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGithub,
  SiGithubactions,
  SiJavascript,
  SiJupyter,
  SiKeras,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNumpy,
  SiPandas,
  SiPostman,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import { jsx } from "react/jsx-runtime";
import {
  SiFlask,
  SiGit,
  SiLangchain,
  SiOpenai,
  SiTableau,
  SiVercel,
  SiVite,
} from "@/components/icons/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";
import { techStack } from "@/data/techStack";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const syncDarkMode = () => {
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");
      setIsDark(hasDarkClass);
    };
    syncDarkMode();
    const observer = new MutationObserver(syncDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="skill-logos-container">
      <div className="skill-logos-scroll">
        <div className="skill-logos-track">
          {techStack.map((tech, index) => {
            const TechIcon = tech.icon,
              iconColor = isDark ? tech.darkColor : tech.color;
            return (
              <div className="skill-logo-item group" key={`first-${index}`}>
                <TechIcon
                  className="skill-logo-icon"
                  style={{
                    color: iconColor,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
                <span className="skill-logo-name">{tech.name}</span>
              </div>
            );
          })}
          {techStack.map((tech, index) => {
            const TechIcon = tech.icon,
              iconColor = isDark ? tech.darkColor : tech.color;
            return (
              <div className="skill-logo-item group" key={`second-${index}`}>
                <TechIcon
                  className="skill-logo-icon"
                  style={{
                    color: iconColor,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
                <span className="skill-logo-name">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function Skills() {
  const { t } = useLanguage(),
    getBadgeColor = (skillName) =>
      ({
        React: "bg-cyan-500 hover:bg-cyan-600",
        "Next.js":
          "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 dark:text-black",
        JavaScript: "bg-yellow-500 hover:bg-yellow-600",
        Vite: "bg-purple-600 hover:bg-purple-700",
        "Tailwind CSS": "bg-cyan-500 hover:bg-cyan-600",
        "ShadCN UI": "bg-cyan-500 hover:bg-cyan-600",
        "Express.js": "bg-green-600 hover:bg-green-700",
        TypeScript: "bg-blue-600 hover:bg-blue-700",
        Flask: "bg-gray-700 hover:bg-gray-800",
        "FAST API": "bg-teal-600 hover:bg-teal-700",
        "Web Scraping": "bg-blue-500 hover:bg-blue-600",
        LangChain: "bg-green-700 hover:bg-green-800",
        "LLM Integration": "bg-green-600 hover:bg-green-700",
        TensorFlow: "bg-orange-600 hover:bg-orange-700",
        Keras: "bg-red-600 hover:bg-red-700",
        "Scikit-learn": "bg-orange-500 hover:bg-orange-600",
        "OpenAI GPT": "bg-green-600 hover:bg-green-700",
        "RAG Systems": "bg-indigo-600 hover:bg-indigo-700",
        SQL: "bg-blue-700 hover:bg-blue-800",
        MongoDB: "bg-green-600 hover:bg-green-700",
        SQLite: "bg-blue-600 hover:bg-blue-700",
        Supabase: "bg-green-500 hover:bg-green-600",
        Python: "bg-blue-500 hover:bg-blue-600",
        Pandas: "bg-purple-600 hover:bg-purple-700",
        NumPy: "bg-indigo-600 hover:bg-indigo-700",
        Jupyter: "bg-orange-500 hover:bg-orange-600",
        "Data Analysis": "bg-purple-600 hover:bg-purple-700",
        "Statistical Analysis": "bg-indigo-600 hover:bg-indigo-700",
        "Data Preprocessing": "bg-blue-600 hover:bg-blue-700",
        "Power BI": "bg-yellow-600 hover:bg-yellow-700",
        Matplotlib: "bg-blue-500 hover:bg-blue-600",
        Seaborn: "bg-teal-600 hover:bg-teal-700",
        Tableau: "bg-blue-700 hover:bg-blue-800",
        Git: "bg-red-600 hover:bg-red-700",
        GitHub:
          "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 dark:text-black",
        "GitHub Actions": "bg-blue-600 hover:bg-blue-700",
        "VS Code": "bg-blue-600 hover:bg-blue-700",
        Postman: "bg-orange-600 hover:bg-orange-700",
        Docker: "bg-blue-500 hover:bg-blue-600",
        Azure: "bg-blue-700 hover:bg-blue-800",
        Vercel:
          "bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-100 dark:text-black",
        "CI/CD": "bg-blue-600 hover:bg-blue-700",
      })[skillName] || "bg-blue-500 hover:bg-blue-600",
    skillCategories = [
      {
        category: "Web Development",
        icon: SiReact,
        skills: [
          {
            name: "React",
            icon: SiReact,
          },
          {
            name: "Next.js",
            icon: SiNextdotjs,
          },
          {
            name: "JavaScript",
            icon: SiJavascript,
          },
          {
            name: "Vite",
            icon: SiVite,
          },
          {
            name: "Tailwind CSS",
            icon: SiTailwindcss,
          },
          {
            name: "ShadCN UI",
            icon: SiReact,
          },
          {
            name: "Express.js",
            icon: SiExpress,
          },
          {
            name: "TypeScript",
            icon: SiTypescript,
          },
          {
            name: "Flask",
            icon: SiFlask,
          },
          {
            name: "FAST API",
            icon: SiFastapi,
          },
          {
            name: "Web Scraping",
            icon: SiPython,
          },
        ],
      },
      {
        category: "AI & Machine Learning",
        icon: Bot,
        skills: [
          {
            name: "LangChain",
            icon: SiLangchain,
          },
          {
            name: "LLM Integration",
            icon: SiOpenai,
          },
          {
            name: "TensorFlow",
            icon: SiTensorflow,
          },
          {
            name: "Keras",
            icon: SiKeras,
          },
          {
            name: "Scikit-learn",
            icon: SiScikitlearn,
          },
          {
            name: "OpenAI GPT",
            icon: SiOpenai,
          },
          {
            name: "RAG Systems",
            icon: Search,
          },
        ],
      },
      {
        category: "Databases",
        icon: SiMongodb,
        skills: [
          {
            name: "SQL",
            icon: SiMysql,
          },
          {
            name: "MongoDB",
            icon: SiMongodb,
          },
          {
            name: "SQLite",
            icon: SiSqlite,
          },
          {
            name: "Supabase",
            icon: SiSupabase,
          },
        ],
      },
      {
        category: "Data Science",
        icon: SiPython,
        skills: [
          {
            name: "Python",
            icon: SiPython,
          },
          {
            name: "Pandas",
            icon: SiPandas,
          },
          {
            name: "NumPy",
            icon: SiNumpy,
          },
          {
            name: "Jupyter",
            icon: SiJupyter,
          },
          {
            name: "Data Analysis",
            icon: BarChart,
          },
          {
            name: "Statistical Analysis",
            icon: TrendingUp,
          },
          {
            name: "Data Preprocessing",
            icon: SiPython,
          },
        ],
      },
      {
        category: "Data Visualization",
        icon: BarChart,
        skills: [
          {
            name: "Power BI",
            icon: BarChart,
          },
          {
            name: "Matplotlib",
            icon: SiPython,
          },
          {
            name: "Seaborn",
            icon: SiPython,
          },
          {
            name: "Tableau",
            icon: SiTableau,
          },
        ],
      },
      {
        category: "Version Control & Tools",
        icon: SiGit,
        skills: [
          {
            name: "Git",
            icon: SiGit,
          },
          {
            name: "GitHub",
            icon: SiGithub,
          },
          {
            name: "GitHub Actions",
            icon: SiGithubactions,
          },
          {
            name: "VS Code",
            icon: Code2,
          },
          {
            name: "Postman",
            icon: SiPostman,
          },
          {
            name: "Docker",
            icon: SiDocker,
          },
          {
            name: "Azure",
            icon: Cloud,
          },
          {
            name: "Vercel",
            icon: SiVercel,
          },
          {
            name: "CI/CD",
            icon: GitBranch,
          },
        ],
      },
    ];
  return (
    <section id="skills" className="py-20 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent btn-shine relative">
              {t.skills.heading}
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
            {t.skills.tagline}
          </p>
        </div>
        {jsx(useDarkMode, {})}
        <div className="flex flex-wrap justify-center gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                className="skill-card bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full sm:w-80 lg:w-96"
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: categoryIndex * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                key={category.category}
              >
                <motion.div
                  className="flex items-center mb-4"
                  whileHover={{
                    x: 5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      scale: 1.2,
                      transition: {
                        duration: 0.5,
                      },
                    }}
                  >
                    <CategoryIcon className="w-6 h-6 text-green-500 mr-3" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {category.category}
                  </h3>
                </motion.div>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.span
                        className={`skill-badge flex items-center px-3 py-1.5 text-white text-xs font-medium rounded-lg transition-colors duration-200 ${getBadgeColor(skill.name)}`}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -2, 2, 0],
                          transition: {
                            scale: {
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            },
                            rotate: {
                              duration: 0.3,
                              ease: "easeInOut",
                            },
                          },
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        key={skill.name}
                      >
                        <motion.div
                          whileHover={{
                            rotate: 360,
                            transition: {
                              duration: 0.5,
                            },
                          }}
                        >
                          <SkillIcon className="w-3 h-3 mr-1.5" />
                        </motion.div>
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
