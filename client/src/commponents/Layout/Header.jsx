import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/authStore";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-stone-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold">Kyrgyz Heritage</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-amber-400 transition">
              {t("common.home")}
            </Link>
            <Link to="/map" className="hover:text-amber-400 transition">
              {t("common.map")}
            </Link>
            <Link to="/sites" className="hover:text-amber-400 transition">
              {t("common.sites")}
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition">
              {t("common.about")}
            </Link>
            <Link to="/submit" className="hover:text-amber-400 transition">
              {t("common.submit")}
            </Link>

            {/* Language Switcher - Desktop */}
            <LanguageSwitcher />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === "admin" && (
                  <Link to="/admin" className="hover:text-amber-400 transition">
                    {t("common.admin")}
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 hover:text-amber-400"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-amber-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("common.logout")}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
                >
                  {t("common.login")}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition"
                >
                  {t("common.register")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - WITH Language Switcher */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Language Switcher - Mobile */}
            <LanguageSwitcher />

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4 border-t border-stone-700 pt-4">
            <Link
              to="/"
              className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              {t("common.home")}
            </Link>
            <Link
              to="/map"
              className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              {t("common.map")}
            </Link>
            <Link
              to="/sites"
              className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              {t("common.sites")}
            </Link>
            <Link
              to="/about"
              className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              {t("common.about")}
            </Link>
            <Link
              to="/submit"
              className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
              onClick={() => setIsOpen(false)}
            >
              {t("common.submit")}
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("common.admin")}
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.profile")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 hover:bg-stone-800 rounded-lg transition text-red-400"
                >
                  {t("common.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 px-4 hover:bg-stone-800 rounded-lg transition"
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.login")}
                </Link>
                <Link
                  to="/register"
                  className="block py-3 px-4 bg-amber-600 hover:bg-amber-700 rounded-lg transition text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {t("common.register")}
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
