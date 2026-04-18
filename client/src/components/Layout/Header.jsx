import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-stone-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold">Kyrgyz Heritage</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <Link to="/map" className="hover:text-amber-400">Map</Link>
            <Link to="/about" className="hover:text-amber-400">About</Link>
            <Link to="/submit" className="hover:text-amber-400">Submit</Link>
            <Link to="/login" className="bg-amber-700 px-4 py-2 rounded hover:bg-amber-800">Login</Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <Link to="/" className="block py-2">Home</Link>
            <Link to="/map" className="block py-2">Map</Link>
            <Link to="/about" className="block py-2">About</Link>
            <Link to="/submit" className="block py-2">Submit</Link>
            <Link to="/login" className="block py-2">Login</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
