import React from "react";
import { useTranslation } from "react-i18next";
import {
  Heart,
  Globe,
  Shield,
  Users,
  Sparkles,
  MapPin,
  Mountain,
  Droplets,
  TreePine,
  Star,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPinned,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
// Import Amanat background
import amanatBg from "../assets/Amanat.jpg";

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "150+", label: "heritage_sites", icon: MapPin },
    { value: "45+", label: "sacred_places", icon: Sparkles },
    { value: "30+", label: "oral_histories", icon: BookOpen },
    { value: "500+", label: "community_members", icon: Users },
  ];

  // ✅ MISSING ARRAY - ADD THIS BACK
  const sacredTypes = [
    { icon: "🕌", name: "mazar", count: 24 },
    { icon: "💧", name: "spring", count: 18 },
    { icon: "⛰️", name: "mountain", count: 32 },
    { icon: "🌳", name: "tree", count: 15 },
    { icon: "🌙", name: "cave", count: 12 },
  ];

  // ✅ UPDATED TEAM ARRAY WITH NEW NAMES
  const team = [
    {
      name: "Ешходжаев Алладин",
      role: "founder",
      roleDisplay: "Основатель",
      icon: Star,
      color: "from-yellow-400 to-amber-600",
      textColor: "text-yellow-700",
      bio: "Идейный вдохновитель и руководитель проекта",
    },
    {
      name: "Суранбаев Курманбек",
      role: "historian",
      roleDisplay: "Историк",
      icon: BookOpen,
      color: "from-emerald-400 to-teal-600",
      textColor: "text-emerald-700",
      bio: "Эксперт по культурному наследию Кыргызстана",
    },
    {
      name: "Абдужалилов Исламбек",
      role: "researcher",
      roleDisplay: "Исследователь",
      icon: Award,
      color: "from-blue-400 to-indigo-600",
      textColor: "text-blue-700",
      bio: "Полевой исследователь сакральных мест",
    },
    {
      name: "Абдуламитов Мирбек",
      role: "developer",
      roleDisplay: "Разработчик",
      icon: Sparkles,
      color: "from-purple-400 to-violet-600",
      textColor: "text-purple-700",
      bio: "Full-stack разработчик цифровой платформы",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Amanat Background */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={amanatBg}
            alt="Amanat"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/80 via-amber-800/70 to-stone-900/85"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-yellow-400/30">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-200 text-sm">Amanat</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t("about.title", "О проекте Amanat")}
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 max-w-3xl mx-auto">
            {t(
              "about.subtitle",
              "Сохранение сакрального наследия Кыргызстана для будущих поколений",
            )}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200">
              <div className="bg-yellow-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-yellow-700" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-stone-900">
                {t("about.mission.title", "Наша миссия")}
              </h2>
              <p className="text-stone-700 leading-relaxed">
                {t(
                  "about.mission.description",
                  "Создать всеобъемлющий цифровой архив сакральных мест, ритуалов и устных традиций Кыргызстана, обеспечивая их сохранность и доступность для будущих поколений.",
                )}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
              <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-amber-700" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-stone-900">
                {t("about.vision.title", "Наше видение")}
              </h2>
              <p className="text-stone-700 leading-relaxed">
                {t(
                  "about.vision.description",
                  "Мир, где сакральное наследие кыргызского народа ценится, понимается и защищается через вовлечение сообщества и современные технологии.",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Amanat */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.what_is_amanat", 'Что такое "Аманат"?')}
            </h2>
            <p className="text-xl text-stone-600">
              {t(
                "about.amanat_meaning",
                "Аманат — это то, что доверено на хранение, наследие, которое мы обязаны передать будущим поколениям.",
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">🗻</div>
              <h3 className="font-bold mb-2">
                {t("about.sacred_heritage", "Сакральное наследие")}
              </h3>
              <p className="text-sm text-stone-600">
                {t(
                  "about.sacred_heritage_desc",
                  "Священные горы, мазары, источники и места силы",
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">📜</div>
              <h3 className="font-bold mb-2">
                {t("about.traditions", "Традиции")}
              </h3>
              <p className="text-sm text-stone-600">
                {t(
                  "about.traditions_desc",
                  "Ритуалы, обряды и обычаи, передаваемые из поколения в поколение",
                )}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="text-4xl mb-3">🎤</div>
              <h3 className="font-bold mb-2">
                {t("about.oral_histories", "Устные истории")}
              </h3>
              <p className="text-sm text-stone-600">
                {t(
                  "about.oral_histories_desc",
                  "Легенды, предания и рассказы старейшин",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Places Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("about.sacred_categories", "Типы сакральных мест")}
          </h2>
          <p className="text-stone-600 text-center mb-12">
            {t(
              "about.sacred_categories_desc",
              "Мы документируем различные типы священных мест по всему Кыргызстану",
            )}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {sacredTypes.map((type, i) => (
              <div
                key={i}
                className="bg-stone-50 rounded-xl p-4 text-center hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <h4 className="font-medium text-sm">
                  {t(`sacred.types.${type.name}`, type.name)}
                </h4>
                <p className="text-xs text-yellow-600 font-medium mt-1">
                  {type.count}+
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-amber-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-yellow-100 text-sm">
                  {t(`about.stats.${stat.label}`, stat.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - UPDATED VERSION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t("about.team.title", "Наша команда")}
          </h2>
          <p className="text-stone-600 text-center mb-12">
            {t(
              "about.team.subtitle",
              "Энтузиасты, работающие над сохранением наследия",
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full opacity-80 group-hover:opacity-100 transition`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <member.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className={`${member.textColor} font-medium text-sm mb-2`}>
                  {member.roleDisplay}
                </p>
                <p className="text-stone-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Team Quote */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <Sparkles className="w-6 h-6 text-amber-500 mx-auto mb-3" />
              <p className="text-stone-700 italic">
                {t(
                  "about.team.quote",
                  '"Мы верим, что сохранение сакрального наследия — это не просто работа, а миссия, доверенная нам предками."',
                )}
              </p>
              <p className="text-amber-700 font-medium mt-3">
                — {t("about.team.quote_author", "Команда Amanat")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 md:p-12 border border-yellow-200">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {t("about.get_involved", "Принять участие")}
            </h2>
            <p className="text-stone-700 mb-8 text-center">
              {t(
                "about.ways_to_contribute",
                "Есть много способов внести вклад в сохранение сакрального наследия Кыргызстана:",
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-yellow-100 rounded-full p-1 mt-0.5">
                    <ChevronRight className="w-4 h-4 text-yellow-700" />
                  </div>
                  <span className="text-stone-700">
                    {t(`about.contribute_list.${i}`, `Способ участия ${i}`)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition"
              >
                <Sparkles className="w-5 h-5" />
                {t("common.submit")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("about.contact_us", "Свяжитесь с нами")}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-yellow-600/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinned className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold mb-2">
                {t("footer.address", "Адрес")}
              </h4>
              <p className="text-stone-400">Бишкек, Кыргызстан</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold mb-2">Email</h4>
              <a
                href="mailto:info@amanat.kg"
                className="text-yellow-400 hover:text-yellow-300"
              >
                info@amanat.kg
              </a>
            </div>
            <div className="text-center">
              <div className="bg-yellow-600/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="font-semibold mb-2">
                {t("about.phone", "Телефон")}
              </h4>
              <p className="text-stone-400">+996 XXX XXX XXX</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
