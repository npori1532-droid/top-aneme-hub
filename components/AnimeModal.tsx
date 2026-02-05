import React, { useEffect } from 'react';
import { Anime } from '../types';

interface AnimeModalProps {
  anime: Anime | null;
  isOpen: boolean;
  onClose: () => void;
}

const AnimeModal: React.FC<AnimeModalProps> = ({ anime, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !anime) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-card w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-float">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="grid md:grid-cols-3">
            {/* Left Side: Image */}
            <div className="md:col-span-1 relative h-64 md:h-auto">
                <img
                    src={anime.thumbnail}
                    alt={anime.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Right Side: Details */}
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col h-full">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold border border-primary/30">
                            Rank #{anime.rank}
                        </span>
                         <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded text-xs font-semibold border border-secondary/30">
                            {anime.type}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {anime.title}
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-darker/50 p-3 rounded-lg border border-white/5">
                            <span className="text-gray-400 text-xs block mb-1">Score</span>
                            <div className="flex items-center gap-2 text-yellow-400 text-lg font-bold">
                                <i className="fa-solid fa-star"></i> {anime.score}
                            </div>
                        </div>
                        <div className="bg-darker/50 p-3 rounded-lg border border-white/5">
                            <span className="text-gray-400 text-xs block mb-1">Members</span>
                            <div className="flex items-center gap-2 text-white text-lg font-bold">
                                <i className="fa-solid fa-users"></i> {anime.members.split(' ')[0]}
                            </div>
                        </div>
                        <div className="bg-darker/50 p-3 rounded-lg border border-white/5">
                            <span className="text-gray-400 text-xs block mb-1">Released</span>
                            <div className="text-white font-medium">
                                {anime.release}
                            </div>
                        </div>
                         <div className="bg-darker/50 p-3 rounded-lg border border-white/5">
                            <span className="text-gray-400 text-xs block mb-1">Status</span>
                            <div className="text-white font-medium">
                                {anime.release.includes('?') ? 'Upcoming' : 'Finished'}
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        Experience the masterful storytelling and breathtaking animation of {anime.title}.
                        Join millions of fans worldwide in watching this highly acclaimed masterpiece.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-0">
                    <a
                        href={anime.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-primary hover:bg-violet-600 text-white text-center py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-play"></i> Watch Now
                    </a>
                    <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                        <i className="fa-regular fa-heart"></i>
                    </button>
                    <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
                         <i className="fa-solid fa-share-nodes"></i>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;
