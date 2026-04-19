import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Search,
  Heart,
  Settings,
  LayoutGrid,
  Globe,
  Sparkles,
  Compass,
  Home,
  Info,
  Upload,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/authStore";
// Import your Amanat logo
import amanatLogo from "../../assets/Amanat.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
    setShowLangMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
    localStorage.setItem("language", lng);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/sites?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const languages = [
    { code: "ru", name: "Русский", flag: "🇷🇺", native: "Русский" },
    { code: "kg", name: "Кыргызча", flag: "🇰🇬", native: "Кыргызча" },
    { code: "en", name: "English", flag: "🇬🇧", native: "English" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const navItems = [
    { path: "/", label: t("common.home"), icon: Home },
    { path: "/map", label: t("common.map"), icon: Compass },
    { path: "/sites", label: t("common.sites"), icon: LayoutGrid },
    { path: "/sacred", label: "Сакральные", icon: Sparkles },
    { path: "/about", label: t("common.about"), icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-stone-900/95 backdrop-blur-xl shadow-2xl py-2"
            : "bg-gradient-to-b from-stone-900/90 to-transparent py-4"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Logo - AMANAT - YELLOW THEME + BIGGER */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative">
                  <img
                    src={amanatLogo}
                    alt="Amanat"
                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain rounded-full"
                  />
                </div>
              </div>
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Amanat
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${
                    isActive(item.path)
                      ? "text-yellow-400 bg-white/10"
                      : "text-stone-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-yellow-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search Bar - Desktop */}
              <form
                onSubmit={handleSearch}
                className="hidden lg:block relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("common.search")}
                  className="w-64 px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-full text-white placeholder-stone-400 focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              </form>

              {/* Submit Button - YELLOW */}
              <Link
                to="/submit"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 font-medium"
              >
                <Upload className="w-4 h-4" />
                <span>{t("common.submit")}</span>
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLangMenu(!showLangMenu);
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-2 p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {currentLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ${showLangMenu ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-stone-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 ${
                            i18n.language === lang.code
                              ? "bg-yellow-600 text-white"
                              : "text-stone-300 hover:bg-white/10"
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="flex-1 text-left">
                            {lang.native}
                          </span>
                          {i18n.language === lang.code && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white"
                            >
                              ✓
                            </motion.span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu / Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowUserMenu(!showUserMenu);
                      setShowLangMenu(false);
                    }}
                    className="flex items-center gap-2 p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="hidden lg:inline font-medium">
                      {user?.username}
                    </span>
                    <ChevronDown
                      className={`hidden lg:block w-3 h-3 transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-stone-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white font-medium">
                            {user?.username}
                          </p>
                          <p className="text-sm text-stone-400">
                            {user?.email}
                          </p>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-stone-300 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            <span>{t("common.profile")}</span>
                          </Link>

                          {user?.role === "admin" && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-3 px-4 py-2 text-stone-300 hover:text-white hover:bg-white/10 transition-all"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <Settings className="w-4 h-4" />
                              <span>{t("common.admin")}</span>
                            </Link>
                          )}

                          <Link
                            to="/favorites"
                            className="flex items-center gap-3 px-4 py-2 text-stone-300 hover:text-white hover:bg-white/10 transition-all"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Heart className="w-4 h-4" />
                            <span>Избранное</span>
                          </Link>
                        </div>

                        <div className="border-t border-white/10 py-2">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>{t("common.logout")}</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t("common.login")}</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{t("common.register")}</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                  setShowUserMenu(false);
                  setShowLangMenu(false);
                }}
                className="lg:hidden p-2 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-stone-900/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("common.search")}
                    className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-yellow-500/50"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                </form>

                {/* Mobile Navigation */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-yellow-600 text-white"
                          : "text-stone-300 hover:bg-white/10"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  <Link
                    to="/submit"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Upload className="w-5 h-5" />
                    <span>{t("common.submit")}</span>
                  </Link>
                </div>

                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 px-4 py-3 text-stone-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="w-5 h-5" />
                      <span>{t("common.login")}</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserPlus className="w-5 h-5" />
                      <span>{t("common.register")}</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;
