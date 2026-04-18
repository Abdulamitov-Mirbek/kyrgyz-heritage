import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useGeolocation } from '../../hooks/useGeolocation';
import L from 'leaflet';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ onLocationSelect }) => {
  const [position, setPosition] = React.useState(null);
  const { location } = useGeolocation();

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  React.useEffect(() => {
    if (location && !position) {
      const defaultPos = { lat: location.lat, lng: location.lng };
      setPosition(defaultPos);
      onLocationSelect(defaultPos);
    }
  }, [location]);

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ onLocationSelect }) => {
  const defaultCenter = [42.8746, 74.5698]; // Bishkek

  return (
    <div className="h-64 rounded-lg overflow-hidden border">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        className="w-full h-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;