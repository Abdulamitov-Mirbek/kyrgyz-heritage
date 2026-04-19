import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  Search,
  Filter,
  Mountain,
  Droplets,
  TreePine,
  Landmark,
  Star,
  Loader2,
  ChevronRight,
} from "lucide-react";

const SacredSitesPage = () => {
  const [sites, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const sacredTypes = [
    { value: "all", label: "Все типы", icon: Sparkles },
    { value: "mountain", label: "Горы", icon: Mountain },
    { value: "spring", label: "Источники", icon: Droplets },
    { value: "tree", label: "Деревья", icon: TreePine },
    { value: "mazar", label: "Мазары", icon: Landmark },
    { value: "cave", label: "Пещеры", icon: Star },
    { value: "petroglyph", label: "Петроглифы", icon: Sparkles },
  ];

  useEffect(() => {
    fetchSacredSites();
  }, []);

  useEffect(() => {
    filterSites();
  }, [sites, searchTerm, selectedType, selectedRegion]);

  const fetchSacredSites = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/sites?siteType=sacred",
      );
      const data = await response.json();

      if (data.success) {
        setSites(data.data);
        setFilteredSites(data.data);
      }
    } catch (error) {
      console.error("Error fetching sacred sites:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterSites = () => {
    let filtered = [...sites];

    if (searchTerm) {
      filtered = filtered.filter(
        (site) =>
          site.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          site.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          site.location?.region
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((site) => site.sacredType === selectedType);
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter(
        (site) => site.location?.region === selectedRegion,
      );
    }

    setFilteredSites(filtered);
  };

  const regions = [
    ...new Set(sites.map((site) => site.location?.region).filter(Boolean)),
  ];

  const getTypeIcon = (type) => {
    const iconMap = {
      mountain: <Mountain className="w-4 h-4" />,
      spring: <Droplets className="w-4 h-4" />,
      tree: <TreePine className="w-4 h-4" />,
      mazar: <Landmark className="w-4 h-4" />,
      cave: <Star className="w-4 h-4" />,
      petroglyph: <Sparkles className="w-4 h-4" />,
    };
    return iconMap[type] || <Sparkles className="w-4 h-4" />;
  };

  const getTypeLabel = (type) => {
    const labels = {
      mountain: "Гора",
      spring: "Источник",
      tree: "Дерево",
      mazar: "Мазар",
      cave: "Пещера",
      petroglyph: "Петроглифы",
      other: "Другое",
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-stone-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-stone-600">Загрузка сакральных мест...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Духовное наследие Кыргызстана</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сакральные места
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Откройте для себя священные горы, целебные источники, древние
              мазары и места силы
            </p>

            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Поиск по названию, описанию или региону..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-stone-800 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-stone-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Фильтры:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {sacredTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedType === type.value
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 cursor-pointer border-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="all">Все регионы</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <div className="ml-auto text-sm text-stone-500">
              Найдено: {filteredSites.length} мест
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-stone-700 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-stone-500">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <Link
                key={site._id}
                to={`/sites/${site._id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-pink-400">
                  {site.mainPhoto || site.photoUrls?.[0] ? (
                    <img
                      src={site.mainPhoto || site.photoUrls[0]}
                      alt={site.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-purple-700 flex items-center gap-1">
                      {getTypeIcon(site.sacredType)}
                      {getTypeLabel(site.sacredType)}
                    </span>
                  </div>
                  {site.heritageStatus === "UNESCO" && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        UNESCO
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {site.name}
                  </h3>

                  <div className="flex items-center gap-1 text-stone-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {site.location?.region || "Кыргызстан"}
                    </span>
                  </div>

                  <p className="text-stone-600 text-sm line-clamp-3 mb-4">
                    {site.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {site.tags?.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-stone-100 text-stone-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-purple-600 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Подробнее
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-3">
            Знаете о сакральном месте?
          </h2>
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
            Помогите сохранить духовное наследие Кыргызстана — добавьте
            информацию о священных местах, источниках и местах силы.
          </p>
          <Link
            to="/sacred/submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            Добавить сакральное место
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SacredSitesPage;
