import React from 'react';
import { Marker } from 'react-leaflet';

const MapMarker = ({ position, icon, children }) => {
  return (
    <Marker position={position} icon={icon}>
      {children}
    </Marker>
  );
};

export default MapMarker;