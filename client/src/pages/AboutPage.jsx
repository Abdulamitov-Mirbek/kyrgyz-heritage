import React from 'react';
import { Heart, Globe, Shield, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About Kyrgyz Heritage</h1>
      <p className="text-xl text-stone-600 mb-8">
        A community-driven platform dedicated to preserving and documenting the rich cultural heritage of Kyrgyzstan.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 my-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <Heart className="w-10 h-10 text-amber-700 mb-4" />
          <h2 className="text-xl font-bold mb-3">Our Mission</h2>
          <p className="text-stone-600">To create a comprehensive digital archive of Kyrgyzstan's cultural heritage sites, rituals, and oral traditions.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Globe className="w-10 h-10 text-amber-700 mb-4" />
          <h2 className="text-xl font-bold mb-3">Our Vision</h2>
          <p className="text-stone-600">A world where Kyrgyz cultural heritage is celebrated, understood, and protected.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Shield className="w-10 h-10 text-amber-700 mb-4" />
          <h2 className="text-xl font-bold mb-3">Preservation</h2>
          <p className="text-stone-600">We work with local communities to document and preserve traditional knowledge.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Users className="w-10 h-10 text-amber-700 mb-4" />
          <h2 className="text-xl font-bold mb-3">Community</h2>
          <p className="text-stone-600">Our platform is built by and for the community.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
