import { useLanguage } from "@/context/LanguageContext";

export const About = () => {
  const { t } = useLanguage();
  return (
    <section
      id="about"
      className={`section-padding bg-white relative overflow-hidden dark:bg-black
 `}
    >
      {" "}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent btn-shine relative">
              {t.about.heading}
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm" />
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-yellow-500 mt-0.5 mx-auto opacity-60" />
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-8 -translate-y-1/2 hidden md:block">
              <div className="w-2 h-2 bg-green-500 rounded-full opacity-60" />
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2 hidden md:block">
              <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-60" />
            </div>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            {t.about.tagline}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-2/5 mb-8 md:mb-0 w-full max-w-sm mx-auto">
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
                <picture>
                  <source srcSet="/img/aboutmedark.png" media="(prefers-color-scheme: dark)" />
                  <img
                    src="/img/aboutmelight.png"
                    alt="About Seto Yoki"
                    className="w-full h-full object-cover dark:hidden"
                    loading="lazy"
                  />
                </picture>
                <img
                  src="/img/aboutmedark.png"
                  alt="About Seto Yoki"
                  className="hidden w-full h-full object-cover dark:block"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-green-300 rounded-2xl z-[-1] dark:bg-black" />
            </div>
          </div>
          <div className="md:w-3/5">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white btn-shine">
              {t.about.introHeading}
            </h3>
            <p className="text-gray-600 mb-4 dark:text-white">{t.about.paragraph1}</p>
            <p className="text-gray-600 mb-6 dark:text-white">{t.about.paragraph2}</p>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:bg-green-600 transition-colors" />
                  {t.about.nameLabel}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{t.about.nameValue}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-yellow-600 transition-colors" />
                  {t.about.emailLabel}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm break-all">
                  setoyoki0221@gmail.com
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 group-hover:bg-cyan-600 transition-colors" />
                  {t.about.locationLabel}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">{t.about.locationValue}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:bg-green-600 transition-colors" />
                  {t.about.availableLabel}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {t.about.availableValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
