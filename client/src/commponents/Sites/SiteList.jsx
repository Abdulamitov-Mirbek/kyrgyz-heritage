import React from 'react';
import { useSites } from '../../hooks/useSites.js';
import SiteCard from './SiteCard.jsx';
import { Search } from 'lucide-react';

// ... rest of the component remains the same

const SiteList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const { data, isLoading } = useSites();

  const filteredSites = data?.data?.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || site.culturalPeriod === filter;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-stone-200 h-48 rounded-t-lg"></div>
              <div className="bg-white p-4 rounded-b-lg">
                <div className="h-4 bg-stone-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-stone-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-stone-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Heritage Sites</h1>
        <p className="text-stone-600">
          Discover and explore the rich cultural heritage of Kyrgyzstan
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field sm:w-48"
        >
          <option value="all">All Periods</option>
          <option value="Ancient">Ancient</option>
          <option value="Medieval">Medieval</option>
          <option value="Colonial">Colonial</option>
          <option value="Modern">Modern</option>
          <option value="Contemporary">Contemporary</option>
        </select>
      </div>

      {/* Results count */}
      <p className="mb-6 text-stone-600">
        {filteredSites?.length || 0} sites found
      </p>

      {/* Sites Grid */}
      {filteredSites?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <SiteCard key={site._id} site={site} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-stone-500 text-lg">No sites found</p>
          <p className="text-stone-400">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
};

export default SiteList;