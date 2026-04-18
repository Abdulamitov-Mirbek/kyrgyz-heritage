import React from 'react';
import { Search } from 'lucide-react';

const SiteList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Heritage Sites</h1>
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search sites..." className="w-full pl-10 px-4 py-2 border rounded-lg" />
        </div>
      </div>
      <p className="text-stone-600">Sites will be displayed here</p>
    </div>
  );
};

export default SiteList;
