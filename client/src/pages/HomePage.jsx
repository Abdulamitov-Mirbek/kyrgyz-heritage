import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  BookOpen,
  Users,
  Upload,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: t("home.features.map.title"),
      description: t("home.features.map.description"),
      color: "from-blue-500 to-cyan-500",
      link: "/map",
    },
    {
      icon: BookOpen,
      title: t("home.features.histories.title"),
      description: t("home.features.histories.description"),
      color: "from-purple-500 to-pink-500",
      link: "/sites",
    },
    {
      icon: Users,
      title: t("home.features.community.title"),
      description: t("home.features.community.description"),
      color: "from-green-500 to-emerald-500",
      link: "/about",
    },
    {
      icon: Upload,
      title: t("home.features.contribute.title"),
      description: t("home.features.contribute.description"),
      color: "from-orange-500 to-red-500",
      link: "/submit",
    },
  ];

  const featuredSites = [
    {
      name: "Бурана мунарасы / Burana Tower",
      nameRu: "Башня Бурана",
      nameKg: "Бурана мунарасы",
      nameEn: "Burana Tower",
      location: t("home.featured.locations.chuy", {
        defaultValue: "Чүй облусу / Chuy Region",
      }),
      locationRu: "Чуйская область",
      locationKg: "Чүй облусу",
      locationEn: "Chuy Region",
      image:
        "https://images.pexels.com/photos/16498845/pexels-photo-16498845.jpeg",
      period: t("home.featured.periods.9th", {
        defaultValue: "IX-XI кылым / 9th-11th Century",
      }),
      periodRu: "IX-XI века",
      periodKg: "IX-XI кылым",
      periodEn: "9th-11th Century",
    },
    {
      name: "Таш-Рабат / Tash Rabat",
      nameRu: "Таш-Рабат",
      nameKg: "Таш-Рабат",
      nameEn: "Tash Rabat",
      location: t("home.featured.locations.naryn", {
        defaultValue: "Нарын облусу / Naryn Region",
      }),
      locationRu: "Нарынская область",
      locationKg: "Нарын облусу",
      locationEn: "Naryn Region",
      image:
        "https://images.pexels.com/photos/29365324/pexels-photo-29365324.jpeg",
      period: t("home.featured.periods.15th", {
        defaultValue: "XV кылым / 15th Century",
      }),
      periodRu: "XV век",
      periodKg: "XV кылым",
      periodEn: "15th Century",
    },
    {
      name: "Саймалуу-Таш / Saimaluu Tash",
      nameRu: "Саймалуу-Таш",
      nameKg: "Саймалуу-Таш",
      nameEn: "Saimaluu Tash",
      location: t("home.featured.locations.jalalabad", {
        defaultValue: "Жалал-Абад облусу / Jalal-Abad Region",
      }),
      locationRu: "Джалал-Абадская область",
      locationKg: "Жалал-Абад облусу",
      locationEn: "Jalal-Abad Region",
      image:
        "https://images.pexels.com/photos/28354402/pexels-photo-28354402.jpeg",
      period: t("home.featured.periods.bronze", {
        defaultValue: "Коло доору / Bronze Age",
      }),
      periodRu: "Бронзовый век",
      periodKg: "Коло доору",
      periodEn: "Bronze Age",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/18942624/pexels-photo-18942624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Kyrgyz Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-stone-900/70 to-stone-900/80"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-amber-400/30">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 text-sm">
                {t("home.hero.badge")}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t("home.hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                {t("home.hero.title_highlight")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto">
              {t("home.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {t("home.hero.explore_map")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/submit"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                {t("home.hero.contribute")}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">
                  150+
                </div>
                <div className="text-stone-300 text-sm">
                  {t("home.stats.sites")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">
                  45+
                </div>
                <div className="text-stone-300 text-sm">
                  {t("home.stats.histories")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400">
                  30+
                </div>
                <div className="text-stone-300 text-sm">
                  {t("home.stats.rituals")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-stone-900">
                  {feature.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center text-amber-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t("common.learnMore")}{" "}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sites Carousel */}
      <section className="py-24 bg-stone-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {t("home.featured.title")}
              </h2>
              <p className="text-stone-400">{t("home.featured.subtitle")}</p>
            </div>
            <Link
              to="/sites"
              className="text-amber-400 hover:text-amber-300 flex items-center gap-2"
            >
              {t("common.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredSites.map((site, index) => (
              <Link
                key={index}
                to={`/sites/${index + 1}`}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-amber-400 text-sm mb-1">
                    {site.period}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{site.name}</h3>
                  <div className="flex items-center text-stone-300 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {site.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-amber-700 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
            >
              {t("home.cta.get_started")}
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              {t("home.cta.learn_more")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
