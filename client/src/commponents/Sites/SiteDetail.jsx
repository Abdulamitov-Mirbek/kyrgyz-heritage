import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Eye, Tag, Clock, Phone, Mail, Globe } from 'lucide-react';
import { useSite } from '../../hooks/useSites.js';
import HeritageMap from '../Map/HeritageMap.jsx';

// ... rest of the component remains the same
const SiteDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useSite(id);
  const site = data?.data;

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-stone-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-stone-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-stone-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Site not found</h2>
        <p>The heritage site you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-96">
        {site.images?.[0] ? (
          <img
            src={site.images[0].url}
            alt={site.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-stone-300 flex items-center justify-center">
            <MapPin className="w-20 h-20 text-stone-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-2">{site.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-amber-700 px-3 py-1 rounded-full text-sm">
                {site.heritageStatus}
              </span>
              <span className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {site.viewCount} views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <p className="text-stone-700 leading-relaxed">{site.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-amber-700" />
                  <h3 className="font-semibold">Location</h3>
                </div>
                <p className="text-stone-600">{site.location?.address}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-amber-700" />
                  <h3 className="font-semibold">Cultural Period</h3>
                </div>
                <p className="text-stone-600">{site.culturalPeriod}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <h3 className="font-semibold">Visiting Hours</h3>
                </div>
                <p className="text-stone-600">{site.visitingHours || 'Not specified'}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-5 h-5 text-amber-700" />
                  <h3 className="font-semibold">Accessibility</h3>
                </div>
                <p className="text-stone-600">{site.accessibility}</p>
              </div>
            </div>

            {site.contactInfo && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {site.contactInfo.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-amber-700" />
                      <span>{site.contactInfo.phone}</span>
                    </div>
                  )}
                  {site.contactInfo.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5 text-amber-700" />
                      <a href={`mailto:${site.contactInfo.email}`} className="text-amber-700 hover:underline">
                        {site.contactInfo.email}
                      </a>
                    </div>
                  )}
                  {site.contactInfo.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-amber-700" />
                      <a href={site.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {site.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Images</span>
                  <span className="font-semibold">{site.images?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rituals</span>
                  <span className="font-semibold">{site.rituals?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Oral Histories</span>
                  <span className="font-semibold">{site.oralHistories?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contributors</span>
                  <span className="font-semibold">{site.contributors?.length || 1}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Map</h3>
              <div className="h-48 rounded-lg overflow-hidden">
                <HeritageMap />
              </div>
            </div>
          </div>
        </div>

        {/* Rituals Section */}
        {site.rituals?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Associated Rituals</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {site.rituals.map((ritual) => (
                <div key={ritual._id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">{ritual.name}</h3>
                  <p className="text-stone-600 text-sm mb-3">{ritual.description}</p>
                  <div className="flex items-center text-sm text-stone-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{ritual.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oral Histories Section */}
        {site.oralHistories?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Oral Histories</h2>
            <div className="space-y-4">
              {site.oralHistories.map((history) => (
                <div key={history._id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-lg mb-2">{history.title}</h3>
                  <p className="text-stone-600 mb-3">Storyteller: {history.storyteller?.name}</p>
                  <p className="text-stone-700">{history.content?.summary || history.content?.transcript?.substring(0, 200)}...</p>
                  {history.media?.audioUrl && (
                    <audio controls className="mt-4 w-full">
                      <source src={history.media.audioUrl} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteDetail;