import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getPhoneText } from "@/data/phone/translations";

const skillCategories = [
  {
    title: "Web Development",
    items: [
      {
        name: "React",
        artist: "Frontend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        artist: "Full Stack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "JavaScript",
        artist: "Language",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        artist: "Type Safety",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind CSS",
        artist: "UI Styling",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Express.js",
        artist: "Backend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Flask",
        artist: "Python Backend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        name: "FAST API",
        artist: "API Development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    items: [
      {
        name: "LangChain",
        artist: "AI Orchestration",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "LLM Integration",
        artist: "AI Applications",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      },
      {
        name: "TensorFlow",
        artist: "Machine Learning",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Keras",
        artist: "Deep Learning",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
      },
      {
        name: "Scikit-learn",
        artist: "Predictive Models",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
      },
      {
        name: "RAG Systems",
        artist: "Knowledge Retrieval",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    title: "Databases",
    items: [
      {
        name: "SQL",
        artist: "Relational Data",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "MongoDB",
        artist: "NoSQL Data",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "SQLite",
        artist: "Local Data",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
      },
      {
        name: "Supabase",
        artist: "Backend Platform",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
    ],
  },
  {
    title: "Data Science",
    items: [
      {
        name: "Python",
        artist: "Data & AI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Pandas",
        artist: "Data Analysis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      },
      {
        name: "NumPy",
        artist: "Numerical Computing",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
      },
      {
        name: "Jupyter",
        artist: "Experimentation",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
      },
      {
        name: "Data Analysis",
        artist: "Insights",
        icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      },
      {
        name: "Data Preprocessing",
        artist: "Preparation",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    title: "Data Visualization",
    items: [
      {
        name: "Power BI",
        artist: "Business Intelligence",
        icon: "https://cdn-icons-png.flaticon.com/512/906/906310.png",
      },
      {
        name: "Matplotlib",
        artist: "Python Charts",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Seaborn",
        artist: "Statistical Charts",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Tableau",
        artist: "Visual Analytics",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg",
      },
    ],
  },
  {
    title: "Version Control & Tools",
    items: [
      {
        name: "Git",
        artist: "Version Control",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        artist: "Collaboration",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "GitHub Actions",
        artist: "Automation",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
      },
      {
        name: "VS Code",
        artist: "Development",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        artist: "API Testing",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      {
        name: "Docker",
        artist: "Containers",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Vercel",
        artist: "Deployment",
        icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
      },
      {
        name: "CI/CD",
        artist: "Delivery Pipelines",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
    ],
  },
];

export function MusicApp({ onClose, onStartClose }) {
  const { language } = useLanguage(),
    t = getPhoneText(language),
    [visible, setVisible] = useState(false),
    [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);
  const handleClose = () => {
      onStartClose && onStartClose();
      setVisible(false);
      setTimeout(onClose, 300);
    },
    SkillItem = ({ item, isPlaying, onClick }) => (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 0",
          cursor: "pointer",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "6px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            padding: "8px",
          }}
        >
          <img
            src={item.icon}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 500,
              color: "black",
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#8e8e93",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {item.artist}
          </div>
        </div>
      </div>
    ),
    allItems = skillCategories.flatMap((category) => category.items);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        borderRadius: "2.5rem",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.92)",
        transition: "opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: visible ? "auto" : "none",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
      <div
        style={{
          paddingTop: "3.5rem",
          paddingBottom: "0.75rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          zIndex: 20,
          position: "sticky",
          top: 0,
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          borderRadius: "3rem 3rem 0 0",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#fa2d48",
            fontWeight: 400,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "17px",
            padding: 0,
          }}
        >
          <ChevronLeft
            size={26}
            style={{
              marginLeft: "-8px",
            }}
          />
          <span
            style={{
              letterSpacing: "-0.4px",
            }}
          >
            {t.common.back}
          </span>
        </button>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 600,
            fontSize: "17px",
          }}
        >
          {t.apps.music}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "20px 0",
          backgroundColor: "#f9f9f9",
          borderBottom: "1px solid #eee",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "fit-content",
            animation: "marquee 40s linear infinite",
          }}
        >
          {[...allItems, ...allItems].map((item, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 20px",
                minWidth: "60px",
              }}
              key={index}
            >
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: "40px",
                  height: "40px",
                  marginBottom: "8px",
                  objectFit: "contain",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#333",
                }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 1.5rem 6rem 1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 700,
            margin: "0 0 1.5rem 0",
            letterSpacing: "-0.5px",
          }}
        >
          {t.music.library}
        </h1>
        {skillCategories.map((category, categoryIndex) => (
          <div
            style={{
              marginBottom: "2rem",
            }}
            key={categoryIndex}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {category.title}
              </h2>
            </div>
            {category.items.map((item, itemIndex) => (
              <SkillItem
                item={item}
                isPlaying={(selectedItem == null ? void 0 : selectedItem.name) === item.name}
                onClick={() => setSelectedItem(item)}
                key={itemIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "134px",
          height: "5px",
          backgroundColor: "black",
          borderRadius: "100px",
          zIndex: 400,
        }}
      />
    </div>
  );
}
