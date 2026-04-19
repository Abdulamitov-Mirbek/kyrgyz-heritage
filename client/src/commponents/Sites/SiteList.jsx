import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSites } from "../../hooks/useSites.js";
import SiteCard from "./SiteCard.jsx";
import { Search, Filter, X, Grid, List, ChevronDown } from "lucide-react";

const SiteList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filter, setFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("newest");
  const [viewMode, setViewMode] = React.useState("grid");
  const [showFilters, setShowFilters] = React.useState(false);
  const { data, isLoading } = useSites();

  const periods = [
    { value: "all", label: t("sites.periods.all") },
    { value: "Ancient", label: t("sites.periods.ancient") },
    { value: "Medieval", label: t("sites.periods.medieval") },
    { value: "Colonial", label: t("sites.periods.colonial") },
    { value: "Modern", label: t("sites.periods.modern") },
    { value: "Contemporary", label: t("sites.periods.contemporary") },
  ];

  const statuses = [
    { value: "all", label: t("sites.statuses.all", "Все статусы") },
    { value: "UNESCO", label: "UNESCO" },
    { value: "National", label: t("sites.statuses.national", "Национальный") },
    { value: "Regional", label: t("sites.statuses.regional", "Региональный") },
    { value: "Local", label: t("sites.statuses.local", "Местный") },
  ];

  const sortOptions = [
    { value: "newest", label: t("sites.sort_options.newest") },
    { value: "oldest", label: t("sites.sort_options.oldest") },
    { value: "name", label: t("sites.sort_options.name") },
    { value: "popular", label: t("sites.sort_options.popular") },
  ];

  const filteredSites = data?.data?.filter((site) => {
    const matchesSearch =
      site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = filter === "all" || site.culturalPeriod === filter;
    const matchesStatus =
      statusFilter === "all" || site.heritageStatus === statusFilter;
    return matchesSearch && matchesPeriod && matchesStatus;
  });

  const sortedSites = [...(filteredSites || [])].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "name":
        return a.name.localeCompare(b.name);
      case "popular":
        return (b.viewCount || 0) - (a.viewCount || 0);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-200 h-64 rounded-t-2xl"></div>
                <div className="bg-white p-6 rounded-b-2xl">
                  <div className="h-5 bg-stone-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-stone-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("sites.title")}
          </h1>
          <p className="text-xl text-stone-200 max-w-2xl">
            {t("sites.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t("sites.search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition ${
                  viewMode === "grid"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition ${
                  viewMode === "list"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-stone-100 rounded-xl hover:bg-stone-200 transition"
            >
              <Filter className="w-5 h-5" />
              {t("common.filter")}
            </button>
          </div>

          {/* Filters */}
          <div
            className={`${showFilters ? "block" : "hidden"} lg:block mt-4 pt-4 border-t`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-stone-700">
                  {t("sites.periods.title", "Культурный период")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {periods.map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setFilter(period.value)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        filter === period.value
                          ? "bg-amber-600 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-stone-700">
                  {t("sites.status", "Статус наследия")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setStatusFilter(status.value)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        statusFilter === status.value
                          ? "bg-amber-600 text-white"
                          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-stone-600">
            {t("sites.found", { count: sortedSites?.length || 0 })}
          </p>
          {(searchTerm || filter !== "all" || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
                setStatusFilter("all");
              }}
              className="text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              {t("common.clear_filters", "Очистить фильтры")}
            </button>
          )}
        </div>

        {/* Sites Grid/List */}
        {sortedSites?.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {sortedSites.map((site) => (
              <SiteCard key={site._id} site={site} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-20 h-20 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t("sites.no_sites")}
            </h3>
            <p className="text-stone-500">{t("sites.try_adjusting")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteList;
