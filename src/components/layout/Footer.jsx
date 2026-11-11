import { ArrowUp, Github, Mail } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage(),
    scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  return (
    <footer className="py-8 px-4 border-t dark:border-gray-700">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-4 order-2 md:order-1">
            <a
              href="https://github.com/setoyoki0221-gif"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:setoyoki0221@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://t.me/setoyoki0221"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors"
              aria-label="Telegram @setoyoki0221"
            >
              <SiTelegram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-center order-1 md:order-2 btn-shine">
            {"© "}
            {new Date().getFullYear()}
            {" Seto Yoki. "}
            {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors order-3"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
