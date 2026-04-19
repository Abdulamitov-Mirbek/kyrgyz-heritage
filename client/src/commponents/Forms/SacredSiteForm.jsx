import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreateSite } from "../../hooks/useSites.js";
import LocationPicker from "./LocationPicker.jsx";
import ImageUploader from "./ImageUploader.jsx";
import api from "../../utils/api.js";
import toast from "react-hot-toast";
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Globe,
  Heart,
  BookOpen,
  Star,
  Mountain,
  Droplets,
  TreePine,
  Plus,
  X,
  ChevronDown,
  Upload,
  Landmark,
  Cloud,
  Moon,
} from "lucide-react";

const SacredSiteForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      siteType: "sacred",
      culturalPeriod: "Ancient",
      heritageStatus: "Local",
      accessibility: "Public",
    },
  });

  const [location, setLocation] = useState(null);
  const [images, setImages] = useState([]);
  const [legends, setLegends] = useState([]);
  const [rituals, setRituals] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [taboos, setTaboos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sacredTypes = [
    {
      value: "mazar",
      label: "🕌 Мазар",
      description: "Святое место захоронения или поклонения",
    },
    {
      value: "spring",
      label: "💧 Святой источник",
      description: "Целебный родник или источник",
    },
    {
      value: "mountain",
      label: "⛰️ Священная гора",
      description: "Горная вершина или перевал",
    },
    {
      value: "tree",
      label: "🌳 Священное дерево",
      description: "Древнее дерево или роща",
    },
    {
      value: "cave",
      label: "🌙 Священная пещера",
      description: "Пещера или грот",
    },
    {
      value: "petroglyph",
      label: "🗿 Петроглифы",
      description: "Наскальные рисунки",
    },
    {
      value: "burial",
      label: "⚰️ Захоронение",
      description: "Древнее кладбище или курган",
    },
    {
      value: "other",
      label: "✨ Другое",
      description: "Иной тип сакрального места",
    },
  ];

  const culturalPeriods = [
    "Ancient",
    "Medieval",
    "Colonial",
    "Modern",
    "Contemporary",
    "Prehistoric",
  ];

  const heritageStatuses = [
    "UNESCO",
    "National",
    "Regional",
    "Local",
    "Unprotected",
    "Endangered",
  ];

  const addLegend = () => {
    setLegends([...legends, { title: "", story: "", source: "" }]);
  };

  const updateLegend = (index, field, value) => {
    const updated = [...legends];
    updated[index][field] = value;
    setLegends(updated);
  };

  const removeLegend = (index) => {
    setLegends(legends.filter((_, i) => i !== index));
  };

  const addItem = (type) => {
    const setters = {
      rituals: setRituals,
      offerings: setOfferings,
      taboos: setTaboos,
    };
    const current = { rituals, offerings, taboos }[type];
    setters[type]([...current, ""]);
  };

  const updateItem = (type, index, value) => {
    const setters = {
      rituals: setRituals,
      offerings: setOfferings,
      taboos: setTaboos,
    };
    const current = { rituals, offerings, taboos }[type];
    const updated = [...current];
    updated[index] = value;
    setters[type](updated);
  };

  const removeItem = (type, index) => {
    const setters = {
      rituals: setRituals,
      offerings: setOfferings,
      taboos: setTaboos,
    };
    const current = { rituals, offerings, taboos }[type];
    setters[type](current.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (!location) {
      toast.error(t("submit.select_location"));
      return;
    }

    setIsSubmitting(true);

    const siteData = {
      ...data,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
        address: data.address,
        city: data.city,
        region: data.region,
        country: data.country || "Кыргызстан",
      },
      tags:
        data.tags
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean) || [],
      legends: legends.filter((l) => l.title && l.story),
      pilgrimageInfo: {
        rituals: rituals.filter((r) => r),
        offerings: offerings.filter((o) => o),
        taboos: taboos.filter((t) => t),
        bestTime: data.bestTime,
      },
      siteType: "sacred",
      isVerified: false,
      verificationStatus: "pending",
    };

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/sites", siteData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Upload images if any
      if (images.length > 0 && response.data.data?._id) {
        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));

        await api.post(`/sites/${response.data.data._id}/images`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success(t("submit.success"));
      navigate("/sacred");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.response?.data?.error || t("submit.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">{t("submit.basic_info")}</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">
              {t("submit.site_name")} <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Название обязательно" })}
              className="input-field"
              placeholder={t("submit.site_name_placeholder")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">
              {t("submit.description")} <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", { required: "Описание обязательно" })}
              className="input-field"
              rows="4"
              placeholder={t("submit.description_placeholder")}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">
                {t("sacred.sacred_type", "Тип сакрального места")}
              </label>
              <select {...register("sacredType")} className="input-field">
                <option value="">Выберите тип...</option>
                {sacredTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">
                {t("submit.cultural_period")}
              </label>
              <select {...register("culturalPeriod")} className="input-field">
                {culturalPeriods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              {t("sacred.spiritual_significance", "Духовное значение")}
            </label>
            <textarea
              {...register("spiritualSignificance")}
              className="input-field"
              rows="3"
              placeholder="Опишите духовное и культурное значение этого места..."
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              {t("sacred.healing_properties", "Целебные свойства")}
            </label>
            <input
              {...register("healingProperties")}
              className="input-field"
              placeholder="Например: Считается, что вода из источника лечит болезни глаз..."
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">{t("submit.location")}</h2>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register("address")}
              className="input-field"
              placeholder="Улица, район"
            />
            <input
              {...register("city")}
              className="input-field"
              placeholder="Город / Село"
            />
            <input
              {...register("region")}
              className="input-field"
              placeholder="Область"
            />
            <input
              {...register("country")}
              className="input-field"
              placeholder="Страна"
              defaultValue="Кыргызстан"
            />
          </div>

          <LocationPicker onLocationSelect={setLocation} />
          {location && (
            <p className="text-sm text-green-600">
              ✓ {t("submit.selected_location")}: {location.lat.toFixed(6)},{" "}
              {location.lng.toFixed(6)}
            </p>
          )}
        </div>
      </div>

      {/* Legends */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">
              {t("sacred.legends", "Легенды и предания")}
            </h2>
          </div>
          <button
            type="button"
            onClick={addLegend}
            className="btn-secondary text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> {t("common.add", "Добавить")}
          </button>
        </div>

        <div className="space-y-4">
          {legends.map((legend, index) => (
            <div key={index} className="border rounded-xl p-4 relative">
              <button
                type="button"
                onClick={() => removeLegend(index)}
                className="absolute top-2 right-2 text-stone-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
              <input
                value={legend.title}
                onChange={(e) => updateLegend(index, "title", e.target.value)}
                className="input-field mb-2"
                placeholder="Название легенды"
              />
              <textarea
                value={legend.story}
                onChange={(e) => updateLegend(index, "story", e.target.value)}
                className="input-field mb-2"
                rows="3"
                placeholder="Текст легенды..."
              />
              <input
                value={legend.source}
                onChange={(e) => updateLegend(index, "source", e.target.value)}
                className="input-field"
                placeholder="Источник (например: Народные предания, Старожилы...)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pilgrimage Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-600 p-2 rounded-xl">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">
            {t("sacred.pilgrimage_info", "Информация для паломников")}
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">
              {t("sacred.best_time", "Лучшее время для посещения")}
            </label>
            <input
              {...register("bestTime")}
              className="input-field"
              placeholder="Например: Лето, весна..."
            />
          </div>

          {/* Rituals */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium">
                {t("sacred.rituals", "Ритуалы")}
              </label>
              <button
                type="button"
                onClick={() => addItem("rituals")}
                className="text-amber-600 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> {t("common.add")}
              </button>
            </div>
            {rituals.map((ritual, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={ritual}
                  onChange={(e) => updateItem("rituals", index, e.target.value)}
                  className="input-field"
                  placeholder="Например: Троекратный обход..."
                />
                <button
                  type="button"
                  onClick={() => removeItem("rituals", index)}
                  className="text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Offerings */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium">
                {t("sacred.offerings", "Подношения")}
              </label>
              <button
                type="button"
                onClick={() => addItem("offerings")}
                className="text-amber-600 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> {t("common.add")}
              </button>
            </div>
            {offerings.map((offering, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={offering}
                  onChange={(e) =>
                    updateItem("offerings", index, e.target.value)
                  }
                  className="input-field"
                  placeholder="Например: Хлеб, молоко..."
                />
                <button
                  type="button"
                  onClick={() => removeItem("offerings", index)}
                  className="text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Taboos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-medium">
                {t("sacred.taboos", "Запреты")}
              </label>
              <button
                type="button"
                onClick={() => addItem("taboos")}
                className="text-amber-600 text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> {t("common.add")}
              </button>
            </div>
            {taboos.map((taboo, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={taboo}
                  onChange={(e) => updateItem("taboos", index, e.target.value)}
                  className="input-field"
                  placeholder="Например: Нельзя громко говорить..."
                />
                <button
                  type="button"
                  onClick={() => removeItem("taboos", index)}
                  className="text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-600 p-2 rounded-xl">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">{t("submit.images")}</h2>
        </div>
        <ImageUploader onImagesChange={setImages} maxImages={10} />
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">{t("submit.tags")}</label>
            <input
              {...register("tags")}
              className="input-field"
              placeholder={t("submit.tags_placeholder")}
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              {t("submit.visiting_hours")}
            </label>
            <input
              {...register("visitingHours")}
              className="input-field"
              placeholder={t("submit.visiting_hours_placeholder")}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register("contactInfo.phone")}
              className="input-field"
              placeholder={t("submit.contact_phone")}
            />
            <input
              {...register("contactInfo.email")}
              className="input-field"
              placeholder={t("submit.contact_email")}
              type="email"
            />
            <div className="md:col-span-2">
              <input
                {...register("contactInfo.website")}
                className="input-field"
                placeholder={t("submit.website_placeholder")}
                type="url"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              {t("submit.heritage_status")}
            </label>
            <select {...register("heritageStatus")} className="input-field">
              {heritageStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4 pb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isSubmitting ? t("submit.submitting") : t("submit.submit_button")}
        </button>
      </div>
    </form>
  );
};

export default SacredSiteForm;
