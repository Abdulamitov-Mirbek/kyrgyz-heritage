import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Heart,
  Mail,
  Phone,
  MapPinned,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  ChevronRight,
  Shield,
  Award,
  MapPin,
  Calendar,
  Users,
  BookOpen,
} from "lucide-react";
import amanatLogo from "../../assets/Amanat.jpg";
import toast from "react-hot-toast";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(t("footer.newsletter.error_empty"));
      return;
    }
    setSubscribing(true);

    // Simulate subscription
    setTimeout(() => {
      toast.success(t("footer.newsletter.success"));
      setEmail("");
      setSubscribing(false);
    }, 1000);
  };

  const quickLinks = [
    { path: "/map", label: t("common.map"), icon: MapPin },
    { path: "/sites", label: t("common.sites"), icon: Calendar },
    {
      path: "/sacred",
      label: t("common.sacred", "Сакральные"),
      icon: Sparkles,
    },
    { path: "/about", label: t("common.about"), icon: Users },
    { path: "/submit", label: t("common.submit"), icon: BookOpen },
  ];

  const resources = [
    { path: "/privacy", label: t("footer.privacy") },
    { path: "/terms", label: t("footer.terms") },
    { path: "/cookies", label: t("footer.cookies") },
    { path: "/help", label: t("footer.help", "Помощь") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-stone-800 bg-gradient-to-r from-yellow-900/20 to-amber-900/20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full mb-6 border border-yellow-500/30">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-200 text-sm">
                {t("footer.newsletter.badge", "Будьте в курсе")}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-stone-400 mb-6 max-w-xl mx-auto">
              {t("footer.newsletter.subtitle")}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 px-6 py-3 bg-stone-800 border border-stone-700 rounded-full text-white placeholder-stone-400 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {subscribing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t("footer.newsletter.button")}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-50"></div>
                <img
                  src={amanatLogo}
                  alt="Amanat"
                  className="w-10 h-10 object-contain rounded-full relative"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                Amanat
              </span>
            </div>
            <p className="text-stone-400 mb-6 leading-relaxed">
              {t("footer.description")}
            </p>

            {/* Certifications/Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-2 rounded-lg">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-stone-300">
                  {t("footer.verified", "Проверено")}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-2 rounded-lg">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-stone-300">
                  UNESCO {t("footer.partner", "партнер")}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-yellow-500" />
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              {t("footer.resources", "Ресурсы")}
            </h4>
            <ul className="space-y-3 mb-8">
              {resources.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-stone-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPinned className="w-4 h-4 text-yellow-500" />
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPinned className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">{t("footer.address")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@amanat.kg"
                  className="text-stone-400 hover:text-yellow-400 transition-colors"
                >
                  info@amanat.kg
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-stone-400">+996 XXX XXX XXX</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-4 h-4 text-yellow-500" />
              {t("footer.followUs", "Подписывайтесь")}
            </h4>
            <div className="flex flex-wrap gap-3 mb-8">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact Info Card */}
            <div className="bg-stone-800/30 rounded-xl p-4 border border-stone-700">
              <p className="text-xs text-stone-400 mb-2">
                {t("footer.working_hours", "Часы работы")}
              </p>
              <p className="text-sm text-stone-300">Пн-Пт: 9:00 - 18:00</p>
              <p className="text-sm text-stone-300">Сб-Вс: 10:00 - 16:00</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12 p-6 bg-stone-800/30 rounded-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">150+</div>
            <div className="text-xs text-stone-400">
              {t("home.stats.sites")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">45+</div>
            <div className="text-xs text-stone-400">
              {t("footer.stats.sacred", "Сакральных мест")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">30+</div>
            <div className="text-xs text-stone-400">
              {t("home.stats.histories")}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">500+</div>
            <div className="text-xs text-stone-400">
              {t("footer.stats.members", "Участников")}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm flex items-center flex-wrap justify-center gap-1">
              <span>© 2026 Amanat.</span>
              <span className="flex items-center">
                {t("footer.made_with", "Сделано с")}
                <Heart className="w-4 h-4 text-red-500 fill-current mx-1 animate-pulse" />
                {t("footer.for_heritage", "для сохранения наследия")}
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/privacy"
                className="text-xs text-stone-400 hover:text-yellow-400 transition"
              >
                {t("footer.privacy")}
              </Link>
              <span className="text-stone-600">|</span>
              <Link
                to="/terms"
                className="text-xs text-stone-400 hover:text-yellow-400 transition"
              >
                {t("footer.terms")}
              </Link>
              <span className="text-stone-600">|</span>
              <Link
                to="/cookies"
                className="text-xs text-stone-400 hover:text-yellow-400 transition"
              >
                {t("footer.cookies")}
              </Link>
              <span className="text-stone-600">|</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs text-yellow-400 hover:text-yellow-300 transition"
              >
                {t("footer.back_to_top", "Наверх")} ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
