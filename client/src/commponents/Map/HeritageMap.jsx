import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useTranslation } from "react-i18next";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import { useNearbySites } from "../../hooks/useSites.js";
import {
  MapPin,
  Navigation,
  Layers,
  X,
  ChevronRight,
  Award,
  Calendar,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import useMapStore from "../../store/mapStore";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (status, period) => {
  const colors = {
    UNESCO: "#FFD700",
    National: "#DC2626",
    Regional: "#2563EB",
    Local: "#10B981",
    default: "#8B5CF6",
  };

  const color = colors[status] || colors.default;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        </svg>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

// Map Controller - Listens to store changes
const MapController = ({ onLocationFound, showUserLocation }) => {
  const map = useMap();
  const mapCenter = useMapStore((state) => state.mapCenter);
  const selectedSite = useMapStore((state) => state.selectedSite);
  const markerRefs = useRef({});

  // Fly to location when mapCenter changes from store
  useEffect(() => {
    if (mapCenter) {
      map.setView([mapCenter.lat, mapCenter.lng], mapCenter.zoom || 14);
    }
  }, [mapCenter, map]);

  // Open popup for selected site
  useEffect(() => {
    if (selectedSite?._id) {
      const lat = selectedSite.location.coordinates[1];
      const lng = selectedSite.location.coordinates[0];
      map.setView([lat, lng], 15);
    }
  }, [selectedSite, map]);

  useEffect(() => {
    if (showUserLocation) {
      map.locate({ setView: true, maxZoom: 16 });

      const onLocationFoundHandler = (e) => {
        onLocationFound?.(e.latlng);
      };

      map.on("locationfound", onLocationFoundHandler);

      return () => {
        map.off("locationfound", onLocationFoundHandler);
      };
    }
  }, [map, showUserLocation, onLocationFound]);

  return null;
};

// Custom Popup Component
const SitePopup = ({ site }) => {
  const { t } = useTranslation();
  const setSelectedSite = useMapStore((state) => state.setSelectedSite);

  const handleViewDetails = () => {
    setSelectedSite(site);
  };

  return (
    <Popup maxWidth={300} minWidth={260}>
      <div className="max-w-xs">
        {site.images?.[0] && (
          <div className="relative h-32 -mx-4 -mt-4 mb-3">
            <img
              src={site.images[0].url}
              alt={site.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
            {site.heritageStatus === "UNESCO" && (
              <div className="absolute top-2 right-2 bg-amber-500 text-white p-1.5 rounded-full">
                <Award className="w-3 h-3" />
              </div>
            )}
            {site.siteType === "sacred" && (
              <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs">
                Сакральное
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-bold text-base text-stone-900">{site.name}</h3>

          <div className="space-y-1 text-xs text-stone-600">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">
                {site.location?.address || t("sites.details.not_specified")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                {site.culturalPeriod || t("sites.details.not_specified")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>
                {site.viewCount || 0} {t("sites.details.views")}
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-700 line-clamp-3">
            {site.description}
          </p>

          <Link
            to={`/sites/${site._id}`}
            onClick={handleViewDetails}
            className="mt-3 w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition text-sm font-medium flex items-center justify-center gap-1"
          >
            {t("common.view_details", "Подробнее")}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Popup>
  );
};

// ... (keep MapNotice, LayerControl, MapLegend components the same) ...

// Main HeritageMap Component
const HeritageMap = ({
  singleSite = null,
  height = "600px",
  showControls = true,
}) => {
  const { t } = useTranslation();
  const { location: userLocation } = useGeolocation();

  // Get state from store
  const storeCenter = useMapStore((state) => state.mapCenter);
  const selectedSite = useMapStore((state) => state.selectedSite);

  const [currentLayer, setCurrentLayer] = useState("streets");
  const [notice, setNotice] = useState(null);
  const [foundLocation, setFoundLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);

  // Use store center or default
  const mapCenter = singleSite?.location?.coordinates
    ? [singleSite.location.coordinates[1], singleSite.location.coordinates[0]]
    : [storeCenter.lat, storeCenter.lng];

  const zoom = singleSite ? 14 : storeCenter.zoom;

  useEffect(() => {
    if (singleSite?.location?.coordinates) {
      // Already handled by mapCenter
    }
  }, [singleSite]);

  const { data: sitesData, isLoading } = useNearbySites(
    mapCenter[1],
    mapCenter[0],
    100,
  );

  const handleLocationFound = (latlng) => {
    setFoundLocation(latlng);
    setNotice({
      message: t("map.location_found", "Местоположение определено"),
      type: "success",
    });
    setTimeout(() => setNotice(null), 3000);
  };

  const centerOnUser = () => {
    if (userLocation) {
      // Use store to update center
      useMapStore.getState().setMapCenter({
        lat: userLocation.lat,
        lng: userLocation.lng,
        zoom: 14,
      });
      setShowUserLocation(true);
    } else {
      setNotice({
        message: t(
          "map.location_unavailable",
          "Не удалось определить местоположение",
        ),
        type: "warning",
      });
      setTimeout(() => setNotice(null), 3000);
    }
  };

  // ... (rest of the component remains the same) ...

  const sites = singleSite ? [singleSite] : sitesData?.data || [];

  // Highlight selected site
  const highlightedSiteId = selectedSite?._id;

  return (
    <div className="relative" style={{ height }}>
      {/* ... (keep all the JSX the same until markers) ... */}

      <MapContainer
        center={mapCenter}
        zoom={zoom}
        className="w-full h-full rounded-xl overflow-hidden"
        zoomControl={false}
        scrollWheelZoom={true}
        maxZoom={18}
        minZoom={3}
      >
        {/* ... */}

        {/* Site Markers */}
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `
                <div style="
                  background: #D97706;
                  width: ${30 + (count > 10 ? 10 : 0)}px;
                  height: ${30 + (count > 10 ? 10 : 0)}px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  font-size: ${12 + (count > 10 ? 2 : 0)}px;
                ">
                  ${count}
                </div>
              `,
              iconSize: [40, 40],
            });
          }}
        >
          {sites.map((site) => (
            <Marker
              key={site._id}
              position={[
                site.location.coordinates[1],
                site.location.coordinates[0],
              ]}
              icon={createCustomIcon(site.heritageStatus, site.culturalPeriod)}
              zIndexOffset={site._id === highlightedSiteId ? 1000 : 0}
            >
              <SitePopup site={site} />
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default HeritageMap;
