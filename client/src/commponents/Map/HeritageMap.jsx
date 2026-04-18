import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useGeolocation } from '../../hooks/useGeolocation.js';
import { useNearbySites } from '../../hooks/useSites.js';
import MapMarker from './MapMarker.jsx';
import MapPopup from './MapPopup.jsx';
import MapFilters from './MapFilters.jsx';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ... rest of the component remains the same
// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view changes
const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const HeritageMap = () => {
  const { location } = useGeolocation();
  const [mapCenter, setMapCenter] = React.useState([42.8746, 74.5698]); // Bishkek
  const [selectedFilters, setSelectedFilters] = React.useState({
    culturalPeriod: 'all',
    heritageStatus: 'all',
  });

  const { data: sitesData, isLoading } = useNearbySites(
    mapCenter[1],
    mapCenter[0],
    50
  );

  const customIcon = (type) => {
    const colors = {
      Ancient: '#8B4513',
      Medieval: '#D2691E',
      Colonial: '#CD853F',
      Modern: '#F4A460',
      default: '#DAA520',
    };
    
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${colors[type] || colors.default}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
      <MapFilters
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />
      
      <MapContainer
        center={mapCenter}
        zoom={10}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} zoom={10} />
        
        {!isLoading && sitesData?.data?.map((site) => (
          <MapMarker
            key={site._id}
            position={[site.location.coordinates[1], site.location.coordinates[0]]}
            icon={customIcon(site.culturalPeriod)}
          >
            <MapPopup site={site} />
          </MapMarker>
        ))}
      </MapContainer>
      
      {isLoading && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            Loading sites...
          </div>
        </div>
      )}
    </div>
  );
};

export default HeritageMap;