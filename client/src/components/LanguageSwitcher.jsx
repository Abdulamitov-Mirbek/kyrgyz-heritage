import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "kg", name: "Кыргызча", flag: "🇰🇬" },
    { code: "en", name: "English", flag: "🇬🇧" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
      >
        <Globe className="w-5 h-5" />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden lg:inline text-sm">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-stone-800 rounded-lg shadow-xl z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-stone-700 transition-colors ${
                  i18n.language === lang.code
                    ? "bg-stone-700 text-amber-400"
                    : "text-stone-200"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="ml-auto text-amber-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
