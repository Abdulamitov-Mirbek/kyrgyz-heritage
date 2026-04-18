import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Eye,
  Tag,
  Clock,
  Phone,
  Mail,
  Globe,
  Users,
  Image,
  Mic,
  BookOpen,
  ChevronRight,
  Share2,
  Heart,
  Award,
  Landmark,
  Accessibility,
  ArrowLeft,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSite } from "../../hooks/useSites.js";
import HeritageMap from "../Map/HeritageMap.jsx";

const SiteDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useSite(id);
  const site = data?.data;
  const [activeTab, setActiveTab] = React.useState("about");
  const [isLiked, setIsLiked] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-stone-200 rounded-2xl mb-8"></div>
            <div className="h-8 bg-stone-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-stone-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <Landmark className="w-20 h-20 text-stone-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-stone-800">
            {t("sites.details.not_found", "Объект не найден")}
          </h2>
          <p className="text-stone-600 mb-6">
            {t(
              "sites.details.not_found_message",
              "Запрашиваемый объект наследия не существует",
            )}
          </p>
          <Link
            to="/sites"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "about", label: t("sites.details.about"), icon: BookOpen },
    { id: "rituals", label: t("sites.details.rituals"), icon: Mic },
    { id: "histories", label: t("sites.details.oral_histories"), icon: Users },
    { id: "gallery", label: t("sites.details.gallery"), icon: Image },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section with Parallax */}
      <div className="relative h-[60vh] min-h-[500px]">
        {site.images?.[0] ? (
          <>
            <img
              src={site.images[0].url}
              alt={site.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-700 to-stone-900 flex items-center justify-center">
            <Landmark className="w-32 h-32 text-white/30" />
          </div>
        )}

        {/* Back Button */}
        <Link
          to="/sites"
          className="absolute top-20 left-4 z-10 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("common.back")}
        </Link>

        {/* Share and Like Buttons */}
        <div className="absolute top-20 right-4 z-10 flex gap-2">
          <button className="bg-white/10 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/20 transition">
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`backdrop-blur-md p-2 rounded-full transition ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              {site.heritageStatus === "UNESCO" && (
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  UNESCO
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                {site.culturalPeriod}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {site.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-stone-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>
                  {site.location?.address || t("sites.details.not_specified")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>
                  {site.viewCount || 0} {t("sites.details.views")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>
                  {(site.contributors?.length || 0) + 1}{" "}
                  {t("sites.details.contributors")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-16 z-20">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? "border-amber-600 text-amber-700"
                    : "border-transparent text-stone-500 hover:text-stone-700"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {tab.id === "rituals" && site.rituals?.length > 0 && (
                  <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full text-xs">
                    {site.rituals.length}
                  </span>
                )}
                {tab.id === "histories" && site.oralHistories?.length > 0 && (
                  <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full text-xs">
                    {site.oralHistories.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "about" && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-amber-700" />
                    {t("sites.details.about")}
                  </h2>
                  <p className="text-stone-700 leading-relaxed text-lg">
                    {site.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <MapPin className="w-8 h-8 text-amber-700 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      {t("sites.details.location")}
                    </h3>
                    <p className="text-stone-600">{site.location?.address}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <Calendar className="w-8 h-8 text-amber-700 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      {t("sites.details.cultural_period")}
                    </h3>
                    <p className="text-stone-600">{site.culturalPeriod}</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <Clock className="w-8 h-8 text-amber-700 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      {t("sites.details.visiting_hours")}
                    </h3>
                    <p className="text-stone-600">
                      {site.visitingHours || t("sites.details.not_specified")}
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <Accessibility className="w-8 h-8 text-amber-700 mb-3" />
                    <h3 className="font-semibold text-lg mb-2">
                      {t("sites.details.accessibility")}
                    </h3>
                    <p className="text-stone-600">
                      {site.accessibility || t("sites.details.not_specified")}
                    </p>
                  </div>
                </div>

                {site.contactInfo && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-xl mb-4">
                      {t("sites.details.contact")}
                    </h3>
                    <div className="space-y-3">
                      {site.contactInfo.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-amber-700" />
                          <a
                            href={`tel:${site.contactInfo.phone}`}
                            className="text-stone-700 hover:text-amber-700"
                          >
                            {site.contactInfo.phone}
                          </a>
                        </div>
                      )}
                      {site.contactInfo.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-amber-700" />
                          <a
                            href={`mailto:${site.contactInfo.email}`}
                            className="text-stone-700 hover:text-amber-700"
                          >
                            {site.contactInfo.email}
                          </a>
                        </div>
                      )}
                      {site.contactInfo.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-amber-700" />
                          <a
                            href={site.contactInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-700 hover:text-amber-700"
                          >
                            {t("sites.details.website")}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "rituals" && (
              <div className="space-y-6">
                {site.rituals?.length > 0 ? (
                  site.rituals.map((ritual) => (
                    <div
                      key={ritual._id}
                      className="bg-white rounded-2xl p-6 shadow-sm"
                    >
                      <h3 className="font-semibold text-xl mb-3">
                        {ritual.name}
                      </h3>
                      <p className="text-stone-600 mb-4">
                        {ritual.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ritual.frequency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {ritual.participants}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <Mic className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">
                      {t(
                        "sites.details.no_rituals",
                        "Нет задокументированных ритуалов",
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "histories" && (
              <div className="space-y-6">
                {site.oralHistories?.length > 0 ? (
                  site.oralHistories.map((history) => (
                    <div
                      key={history._id}
                      className="bg-white rounded-2xl p-6 shadow-sm"
                    >
                      <h3 className="font-semibold text-xl mb-2">
                        {history.title}
                      </h3>
                      <p className="text-stone-500 mb-3">
                        {t("sites.details.storyteller", "Рассказчик")}:{" "}
                        {history.storyteller?.name}
                      </p>
                      <p className="text-stone-700 mb-4">
                        {history.content?.summary ||
                          history.content?.transcript?.substring(0, 300)}
                        ...
                      </p>
                      {history.media?.audioUrl && (
                        <audio controls className="w-full">
                          <source
                            src={history.media.audioUrl}
                            type="audio/mpeg"
                          />
                        </audio>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <Users className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">
                      {t("sites.details.no_histories", "Нет устных историй")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {site.images?.length > 0 ? (
                  site.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt={image.title || site.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <button className="bg-white text-stone-900 p-2 rounded-full">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Image className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">
                      {t("sites.details.no_images", "Нет изображений")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-700" />
                {t("sites.details.tags")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {site.tags?.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/sites?tag=${tag}`}
                    className="bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full text-sm hover:bg-amber-100 hover:text-amber-700 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">
                {t("sites.details.statistics")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-stone-600">
                    {t("sites.details.images")}
                  </span>
                  <span className="font-semibold text-lg">
                    {site.images?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-stone-600">
                    {t("sites.details.rituals")}
                  </span>
                  <span className="font-semibold text-lg">
                    {site.rituals?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-stone-600">
                    {t("sites.details.oral_histories")}
                  </span>
                  <span className="font-semibold text-lg">
                    {site.oralHistories?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-stone-600">
                    {t("sites.details.contributors")}
                  </span>
                  <span className="font-semibold text-lg">
                    {(site.contributors?.length || 0) + 1}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">
                {t("sites.details.map")}
              </h3>
              <div className="h-64 rounded-xl overflow-hidden">
                <HeritageMap singleSite={site} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;
