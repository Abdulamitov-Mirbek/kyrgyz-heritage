import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <MapPin className="w-6 h-6 text-amber-500" />
            <span className="font-bold text-lg">Kyrgyz Heritage</span>
          </div>
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for Kyrgyz Heritage</span>
          </p>
          <p className="mt-2 text-sm text-stone-400">© 2026 Kyrgyz Heritage Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
