import React, { useState, useEffect, useRef, useCallback } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  FullscreenControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  X,
  ChevronRight,
  Award,
  Calendar,
  Eye,
  Navigation,
  Layers,
  Compass,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import useMapStore from "../../store/mapStore";
import { useNearbySites } from "../../hooks/useSites.js";
import { useGeolocation } from "../../hooks/useGeolocation.js";
import toast from "react-hot-toast";

// Map Styles
const mapStyles = {
  streets: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  satellite: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  terrain: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-nq-gl-style/style.json",
};

// Custom Marker
const CustomMarker = ({ site, isSelected, onClick }) => {
  const colors = {
    UNESCO: "#FFD700",
    National: "#DC2626",
    Regional: "#2563EB",
    Local: "#10B981",
    sacred: "#8B5CF6",
    default: "#D97706",
  };

  const color =
    colors[site.heritageStatus] || colors[site.siteType] || colors.default;

  return (
    <Marker
      longitude={site.location.coordinates[0]}
      latitude={site.location.coordinates[1]}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(site);
      }}
    >
      <div
        style={{
          cursor: "pointer",
          transform: isSelected ? "scale(1.2)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            background: color,
            width: isSelected ? "40px" : "32px",
            height: isSelected ? "40px" : "32px",
            borderRadius: "50%",
            border: "3px solid white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width={isSelected ? "18" : "14"}
            height={isSelected ? "18" : "14"}
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </div>
      </div>
    </Marker>
  );
};

// Site Popup
const SitePopup = ({ site, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sacredTypeLabels = {
    mazar: "🕌 Мазар",
    spring: "💧 Источник",
    mountain: "⛰️ Гора",
    tree: "🌳 Дерево",
    cave: "🌙 Пещера",
    petroglyph: "🗿 Петроглифы",
  };

  return (
    <Popup
      longitude={site.location.coordinates[0]}
      latitude={site.location.coordinates[1]}
      anchor="bottom"
      onClose={onClose}
      closeButton={false}
      offset={20}
      maxWidth="320px"
    >
      <div style={{ minWidth: "260px", maxWidth: "300px" }}>
        {site.images?.[0] && (
          <div
            style={{
              position: "relative",
              height: "120px",
              margin: "-12px -12px 12px -12px",
              borderRadius: "12px 12px 0 0",
              overflow: "hidden",
            }}
          >
            <img
              src={site.images[0].url}
              alt={site.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                padding: "6px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        <h3
          style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "8px" }}
        >
          {site.name}
        </h3>

        <div
          style={{ fontSize: "12px", color: "#6B7280", marginBottom: "12px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "start",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            <MapPin size={14} style={{ color: "#D97706", marginTop: "2px" }} />
            <span>
              {site.location?.address?.split(",")[0] ||
                "Местоположение не указано"}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/sites/${site._id}`)}
          style={{
            width: "100%",
            background: "linear-gradient(135deg, #D97706, #B45309)",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          Подробнее
          <ChevronRight size={14} />
        </button>
      </div>
    </Popup>
  );
};

// Main Map Component
const ModernHeritageMap = ({
  height = "calc(100vh - 200px)",
  singleSite = null,
}) => {
  const { t } = useTranslation();
  const { location: userLocation } = useGeolocation();
  const mapRef = useRef(null);

  // Store state
  const storeCenter = useMapStore((state) => state.mapCenter);
  const selectedSite = useMapStore((state) => state.selectedSite);
  const setSelectedSite = useMapStore((state) => state.setSelectedSite);
  const clearSelection = useMapStore((state) => state.clearSelection);

  // Local state
  const [viewState, setViewState] = useState({
    longitude: storeCenter.lng,
    latitude: storeCenter.lat,
    zoom: storeCenter.zoom,
    pitch: 0,
    bearing: 0,
  });

  // Coordinates for API - ONLY update when map STOPS moving
  const [queryCoords, setQueryCoords] = useState({
    lng: storeCenter.lng,
    lat: storeCenter.lat,
  });

  const [currentStyle, setCurrentStyle] = useState("streets");
  const [popupInfo, setPopupInfo] = useState(null);
  const [isMapMoving, setIsMapMoving] = useState(false);

  // Only update query coordinates when map STOPS moving
  const handleMoveEnd = useCallback(
    (evt) => {
      setIsMapMoving(false);
      const { longitude, latitude } = evt.viewState;

      // Only update if moved significantly (>0.02 degrees ~2km)
      if (
        Math.abs(longitude - queryCoords.lng) > 0.02 ||
        Math.abs(latitude - queryCoords.lat) > 0.02
      ) {
        setQueryCoords({
          lng: Number(longitude.toFixed(4)),
          lat: Number(latitude.toFixed(4)),
        });
      }
    },
    [queryCoords],
  );

  const handleMoveStart = useCallback(() => {
    setIsMapMoving(true);
  }, []);

  // Fetch sites with STABLE coordinates (only when map stops)
  const { data: sitesData } = useNearbySites(
    queryCoords.lng,
    queryCoords.lat,
    50,
  );

  const sites = singleSite ? [singleSite] : sitesData?.data || [];

  // Fly to selected site
  useEffect(() => {
    if (selectedSite?.location?.coordinates) {
      setViewState({
        longitude: selectedSite.location.coordinates[0],
        latitude: selectedSite.location.coordinates[1],
        zoom: 15,
        pitch: 45,
        bearing: 0,
        transitionDuration: 2000,
      });
      setPopupInfo(selectedSite);
    }
  }, [selectedSite]);

  const handleMarkerClick = (site) => {
    setSelectedSite(site);
    setPopupInfo(site);
  };

  const flyToUserLocation = () => {
    if (userLocation) {
      setViewState({
        longitude: userLocation.lng,
        latitude: userLocation.lat,
        zoom: 14,
        pitch: 45,
        bearing: 0,
        transitionDuration: 2000,
      });
      toast.success("Местоположение определено");
    } else {
      toast.error("Не удалось определить местоположение");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <style>{`
        .maplibregl-popup-content {
          padding: 12px !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
        }
        .maplibregl-popup-tip {
          display: none !important;
        }
      `}</style>

      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onMoveStart={handleMoveStart}
        onMoveEnd={handleMoveEnd}
        mapStyle={mapStyles[currentStyle]}
        style={{ width: "100%", height: "100%", borderRadius: "16px" }}
        attributionControl={true}
        maxPitch={60}
        minZoom={3}
        maxZoom={18}
        pitchWithRotate={true}
        dragRotate={true}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <GeolocateControl
          position="top-right"
          showUserLocation={true}
          trackUserLocation={false}
        />
        <ScaleControl position="bottom-left" />
        <FullscreenControl position="top-right" />

        {/* User Location Button */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "16px",
            zIndex: 10,
          }}
        >
          <button
            onClick={flyToUserLocation}
            style={{
              background: "white",
              border: "none",
              padding: "12px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "pointer",
            }}
          >
            <Navigation size={20} style={{ color: "#374151" }} />
          </button>
        </div>

        {/* Loading indicator */}
        {isMapMoving && (
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              background: "white",
              borderRadius: "50px",
              padding: "8px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
          >
            Загрузка объектов...
          </div>
        )}

        {/* Markers */}
        {sites.map((site) => (
          <CustomMarker
            key={site._id}
            site={site}
            isSelected={selectedSite?._id === site._id}
            onClick={handleMarkerClick}
          />
        ))}

        {/* Popup */}
        {popupInfo && (
          <SitePopup
            site={popupInfo}
            onClose={() => {
              setPopupInfo(null);
              clearSelection();
            }}
          />
        )}
      </Map>
    </div>
  );
};

export default ModernHeritageMap;
