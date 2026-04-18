import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Eye, Tag, Award, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import useMapStore from "../../store/mapStore";


const SiteCard = ({ site, viewMode = "grid" }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setMapCenter = useMapStore((state) => state.setMapCenter);
  const setSelectedSite = useMapStore((state) => state.setSelectedSite);

  const handleViewOnMap = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Set the map center to this site's location
    if (site.location?.coordinates) {
      setMapCenter({
        lat: site.location.coordinates[1],
        lng: site.location.coordinates[0],
        zoom: 14,
      });
      setSelectedSite(site);

      // Navigate to map page
      navigate("/map");
    }
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-64 h-48 sm:h-auto relative">
            {site.images?.[0] ? (
              <img
                src={site.images[0].url}
                alt={site.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-amber-400" />
              </div>
            )}
            {site.heritageStatus === "UNESCO" && (
              <div className="absolute top-2 left-2 bg-amber-500 text-white p-1.5 rounded-full">
                <Award className="w-4 h-4" />
              </div>
            )}
            {site.siteType === "sacred" && (
              <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                Сакральное
              </div>
            )}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <Link to={`/sites/${site._id}`}>
                <h3 className="font-bold text-xl hover:text-amber-700 transition">
                  {site.name}
                </h3>
              </Link>
              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                {site.culturalPeriod}
              </span>
            </div>
            <p className="text-stone-600 mb-4 line-clamp-2">
              {site.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {site.location?.address?.split(",")[0] ||
                  t("sites.details.not_specified")}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {site.viewCount || 0}
              </span>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/sites/${site._id}`}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm"
              >
                {t("common.learnMore")}
              </Link>
              <button
                onClick={handleViewOnMap}
                className="px-4 py-2 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-50 transition text-sm flex items-center gap-1"
              >
                <Navigation className="w-4 h-4" />
                На карте
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/sites/${site._id}`}>
        <div className="relative h-56">
          {site.images?.[0] ? (
            <img
              src={site.images[0].url}
              alt={site.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center">
              <MapPin className="w-16 h-16 text-amber-400" />
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            {site.heritageStatus === "UNESCO" && (
              <span className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </span>
            )}
            {site.siteType === "sacred" && (
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                Сакральное
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-amber-700 transition">
            {site.name}
          </h3>

          <div className="space-y-1.5 text-sm text-stone-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span className="line-clamp-1">
                {site.location?.address || t("sites.details.not_specified")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{site.culturalPeriod}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                {site.viewCount || 0} {t("sites.details.views")}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5 flex gap-2">
        <Link
          to={`/sites/${site._id}`}
          className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition text-sm text-center"
        >
          {t("common.learnMore")}
        </Link>
        <button
          onClick={handleViewOnMap}
          className="px-3 py-2 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-50 transition"
          title="Показать на карте"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SiteCard;
