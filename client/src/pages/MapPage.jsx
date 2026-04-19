import React from 'react';
import { useTranslation } from 'react-i18next';
import ModernHeritageMap from '../commponents/Map/ModernHeritageMap.jsx';
import useMapStore from '../store/mapStore';

const MapPage = () => {
  const { t } = useTranslation();
  const selectedSite = useMapStore((state) => state.selectedSite);
  const clearSelection = useMapStore((state) => state.clearSelection);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ModernHeritageMap height="calc(100vh - 120px)" />
        </div>
      </div>
    </div>
  );
};

export default MapPage;