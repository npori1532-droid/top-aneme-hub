import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onInstallClick?: () => void;
  showInstallButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onInstallClick, showInstallButton }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-darker/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center animate-spin-slow group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)]">
              <i className="fa-solid fa-play text-white text-xs"></i>
            </div>
            <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-secondary transition-colors duration-300">
              ANIME<span className="font-light">HUB</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-white hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#trending" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Trending</a>
              <a href="#popular" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Popular</a>
              <a href="#genres" className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Genres</a>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
             <div className="relative">
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-slate-800/50 text-white border border-slate-700 rounded-full py-1.5 px-4 pl-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
                />
                <i className="fa-solid fa-search absolute left-3.5 top-2.5 text-gray-400 text-xs"></i>
             </div>
             {showInstallButton && (
               <button
                 onClick={onInstallClick}
                 className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2"
               >
                 <i className="fa-solid fa-download"></i> Install App
               </button>
             )}
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600">
                <i className="fa-regular fa-user text-sm"></i>
             </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-darker border-b border-white/10 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded-md py-2 px-3 mb-3 focus:outline-none focus:border-primary"
            />
            <a href="#" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Home</a>
            <a href="#trending" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Trending</a>
            <a href="#popular" className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">Popular</a>
            {showInstallButton && (
                <button onClick={onInstallClick} className="w-full text-left text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-800">
                   <i className="fa-solid fa-download mr-2"></i> Install App
                </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
