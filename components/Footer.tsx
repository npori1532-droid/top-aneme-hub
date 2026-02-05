import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-darker border-t border-white/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                        <i className="fa-solid fa-play text-white text-xs"></i>
                    </div>
                    <span className="font-bold text-xl text-white">ANIME<span className="font-light">HUB</span></span>
                </div>
                <p className="text-gray-400 text-sm max-w-sm">
                    The ultimate destination for anime enthusiasts. Stream your favorite shows in high quality with an immersive 3D experience.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                    <li><a href="#trending" className="hover:text-primary transition-colors">Trending</a></li>
                    <li><a href="#popular" className="hover:text-primary transition-colors">Popular</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Upcoming</a></li>
                </ul>
            </div>

             {/* Socials */}
             <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                        <i className="fa-brands fa-discord"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-white transition-all">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                    <h3 className="text-white font-semibold">Developer: Tech Master</h3>
                    <p className="text-gray-500 text-xs mt-1">© 2024 Top Anime Hub. All rights reserved.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="https://t.me/tech_master_a2z" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                        <i className="fa-brands fa-telegram"></i> Dev Channel
                    </a>
                     <a href="https://t.me/GAJARBOTOLZ" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                        <i className="fa-solid fa-bullhorn"></i> Official Telegram
                    </a>
                     <a href="https://www.gajarbotol.site/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                        <i className="fa-solid fa-globe"></i> Website
                    </a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
