import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Eye, Tag } from 'lucide-react';

// ... rest of the component remains the same

const SiteCard = ({ site }) => {
  return (
    <Link to={`/sites/${site._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative h-48">
          {site.images?.[0] ? (
            <img
              src={site.images[0].url}
              alt={site.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-stone-200 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-stone-400" />
            </div>
          )}
          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm">
            {site.heritageStatus}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{site.name}</h3>
          
          <div className="space-y-1 text-sm text-stone-600 mb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{site.location?.address || 'Location not specified'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{site.culturalPeriod}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{site.viewCount} views</span>
            </div>
          </div>
          
          <p className="text-sm text-stone-700 line-clamp-2 mb-3">
            {site.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {site.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-stone-100 text-stone-700 px-2 py-1 rounded text-xs flex items-center"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SiteCard;