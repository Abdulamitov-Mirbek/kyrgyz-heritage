import React from 'react';
import { Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Eye } from 'lucide-react';

const MapPopup = ({ site }) => {
  return (
    <Popup>
      <div className="min-w-[200px]">
        {site.images?.[0] && (
          <img
            src={site.images[0].url}
            alt={site.name}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
        )}
        
        <h3 className="font-bold text-lg mb-2">{site.name}</h3>
        
        <div className="space-y-1 text-sm text-stone-600 mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{site.location?.address || 'Location not specified'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{site.culturalPeriod || 'Unknown period'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{site.viewCount || 0} views</span>
          </div>
        </div>
        
        <p className="text-sm text-stone-700 mb-3 line-clamp-2">
          {site.description}
        </p>
        
        <Link
          to={`/sites/${site._id}`}
          className="block w-full text-center bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition text-sm"
        >
          View Details
        </Link>
      </div>
    </Popup>
  );
};

export default MapPopup;