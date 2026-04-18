import React from 'react';
import { Heart, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-8 mt-auto">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-6 h-6 text-amber-500" />
              <span className="font-bold text-lg">Kyrgyz Heritage</span>
            </div>
            <p className="text-stone-400">
              Preserving and documenting the rich cultural heritage of Kyrgyzstan for future generations.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-stone-400">
              <li><a href="/map" className="hover:text-amber-400">Interactive Map</a></li>
              <li><a href="/about" className="hover:text-amber-400">About Project</a></li>
              <li><a href="/submit" className="hover:text-amber-400">Submit Site</a></li>
              <li><a href="/privacy" className="hover:text-amber-400">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-stone-400">
              <li>Email: info@kyrgyzheritage.org</li>
              <li>Phone: +996 XXX XXX XXX</li>
              <li>Bishkek, Kyrgyzstan</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-8 pt-6 text-center text-stone-400">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for Kyrgyz Heritage</span>
          </p>
          <p className="mt-2">© 2026 Kyrgyz Heritage Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;