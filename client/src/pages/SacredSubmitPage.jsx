import React from "react";
import { useTranslation } from "react-i18next";
import SacredSiteForm from "../commponents/Forms/SacredSiteForm.jsx";
import { useRequireAuth } from "../hooks/useAuth.js";
import { Sparkles } from "lucide-react";

const SacredSubmitPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useRequireAuth("/login");

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">
              {t("sacred.submit_badge", "Сакральное место")}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("sacred.submit_title", "Добавить сакральное место")}
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t(
              "sacred.submit_subtitle",
              "Помогите сохранить духовное наследие Кыргызстана, добавив информацию о священных местах, источниках и местах силы.",
            )}
          </p>
        </div>

        <SacredSiteForm />
      </div>
    </div>
  );
};

export default SacredSubmitPage;
