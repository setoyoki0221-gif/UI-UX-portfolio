import { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, Github, Mail, MapPin, RefreshCw, XCircle } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const { t } = useLanguage(),
    [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    }),
    [isSubmitting, setIsSubmitting] = useState(false),
    [isSubmitted, setIsSubmitted] = useState(false),
    [errorMessage, setErrorMessage] = useState(null),
    fireConfetti = async () => {
      await confetti({
        particleCount: 150,
        spread: 90,
        origin: {
          y: 0.6,
        },
        colors: ["#22c55e", "#eab308", "#10b981", "#facc15", "#16a34a", "#06b6d4"],
        scalar: 1.2,
        gravity: 0.8,
        drift: 0.1,
      });
      setTimeout(async () => {
        await confetti({
          particleCount: 80,
          spread: 60,
          origin: {
            y: 0.7,
          },
          colors: ["#22c55e", "#eab308", "#22d3ee"],
          scalar: 0.8,
          shapes: ["circle", "square"],
        });
      }, 400);
    },
    handleChange = (event) => {
      isSubmitted ||
        (setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        }),
        errorMessage && setErrorMessage(null));
    },
    resetForm = () => {
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setIsSubmitted(false);
      setErrorMessage(null);
    },
    handleSubmit = async (event) => {
      if ((event.preventDefault(), !isSubmitted)) {
        setIsSubmitting(true);
        setErrorMessage(null);
        try {
          const response = await fetch("https://portfolio-ss-api.vercel.app/api/resend", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }),
            result = await response.json();
          response.ok
            ? (setIsSubmitted(true), console.log("✅ Message sent successfully!"), fireConfetti())
            : (console.error("🚨 Error response from server:", result),
              setErrorMessage(result.error || t.contact.defaultError));
        } catch (error) {
          console.error("🔥 Network or server error:", error);
          setErrorMessage(t.contact.networkError);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  return (
    <section id="contact" className="py-20 px-4 overflow-hidden relative">
      {" "}
      <div className="container mx-auto">
        {" "}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent btn-shine relative">
              {t.contact.heading}
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
            {t.contact.tagline}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start w-full">
          <div className="space-y-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {t.contact.leftHeading}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.contact.leftSubtext}</p>
            </div>
            <a
              href="mailto:setoyoki0221@gmail.com"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-green-900/20 dark:hover:to-yellow-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-sm hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-0.5"
              aria-label="Send Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-green-600 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {t.contact.emailLabel}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors truncate">
                  setoyoki0221@gmail.com
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
            <a
              href="https://github.com/setoyoki0221-gif"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-green-900/20 dark:hover:to-yellow-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-sm hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-0.5"
              aria-label="View GitHub Profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <Github className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-green-600 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {t.contact.githubLabel}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  {t.contact.githubValue}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
            <a
              href="https://t.me/setoyoki0221"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-green-900/20 dark:hover:to-yellow-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-sm hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-0.5"
              aria-label="Message on Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <SiTelegram className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-green-600 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {t.contact.telegramLabel}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  @setoyoki0221
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Yokohama,+Kanagawa,+Japan"
              className="flex items-center space-x-3 group cursor-pointer bg-white dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 dark:hover:from-green-900/20 dark:hover:to-yellow-900/20 rounded-xl p-4 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-sm hover:shadow-lg hover:shadow-green-500/10 transform hover:-translate-y-0.5"
              aria-label="View Location on Google Maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute inset-0 bg-green-600 dark:bg-green-400 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {t.contact.locationLabel}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  {t.contact.locationValue}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                <svg
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </a>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/30 dark:to-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {t.contact.formHeading}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.contact.formSubtext}</p>
            </div>
            {isSubmitted ? (
              <div className="bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-800/50 rounded-xl p-8 border border-green-200 dark:border-green-700 shadow-lg">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                      <div className="absolute inset-0 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-ping" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 animate-fade-in">
                      {t.contact.successTitle}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {t.contact.successBody}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.contact.successDelivered}</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t.contact.sendAnother}</span>
                    </button>
                  </div>
                  <div className="flex justify-center space-x-1 pt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}{" "}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    {t.contact.nameField}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-green-300 dark:hover:border-green-400 shadow-sm focus:shadow-md"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    {t.contact.emailField}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-green-300 dark:hover:border-green-400 shadow-sm focus:shadow-md"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200"
                  >
                    {t.contact.messageField}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting || isSubmitted}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:border-green-300 dark:hover:border-green-400 shadow-sm focus:shadow-md resize-vertical"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 dark:from-green-500 dark:to-yellow-400 dark:hover:from-green-600 dark:hover:to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-lg shadow-md relative overflow-hidden"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>{t.contact.sendMessage}</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8" />{" "}
          <iframe
            src="https://www.google.com/maps?q=Yokohama,+Kanagawa,+Japan&output=embed"
            width="100%"
            height="400"
            style={{
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
            title={t.contact.mapTitle}
          />
        </div>
      </div>
    </section>
  );
}
