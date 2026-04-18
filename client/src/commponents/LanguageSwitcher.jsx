import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
// ❌ REMOVE THIS LINE: import LanguageSwitcher from "../../components/LanguageSwitcher";

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

  // Debug log to confirm component is rendering
  console.log("LanguageSwitcher rendering, current language:", i18n.language);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white bg-stone-700 hover:bg-stone-600 rounded-lg transition-all duration-300 border border-stone-600"
        style={{ minWidth: "60px" }}
      >
        <Globe className="w-5 h-5 text-amber-400" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden lg:inline text-sm font-medium">
          {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-stone-800 rounded-lg shadow-xl z-50 overflow-hidden border border-stone-700">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  i18n.language === lang.code
                    ? "bg-amber-600 text-white"
                    : "text-stone-200 hover:bg-stone-700"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="flex-1">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="text-white font-bold">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

{
  /* Bright test element - CAN YOU SEE THIS? */
}
<div
  style={{
    background: "limegreen",
    padding: "10px 20px",
    borderRadius: "8px",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    position: "fixed",
    top: "10px",
    right: "10px",
    zIndex: 9999,
  }}
>
  🌐 TEST - Language Switcher Area
</div>;

export default LanguageSwitcher;
