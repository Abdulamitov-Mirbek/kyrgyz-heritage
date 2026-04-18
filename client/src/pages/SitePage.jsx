import React from 'react';
import { useParams } from 'react-router-dom';

const SitePage = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Site Details</h1>
      <p className="text-stone-600">Viewing site ID: {id}</p>
    </div>
  );
};

export default SitePage;
