import React from 'react';
import { Anime } from '../types';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <div
      onClick={() => onClick(anime)}
      className="group relative bg-card rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] border border-white/5 hover:border-primary/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={anime.thumbnail}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-darker via-transparent to-transparent opacity-80" />

        {/* Rank Badge */}
        <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded shadow-lg backdrop-blur-sm">
          #{anime.rank}
        </div>

        {/* Score Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
           <i className="fa-solid fa-star text-[10px]"></i>
           {anime.score}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-primary/50">
                <i className="fa-solid fa-play ml-1"></i>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors" title={anime.title}>
          {anime.title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
            <span>{anime.type.split(' ')[0]}</span>
            <span className="flex items-center gap-1">
                <i className="fa-regular fa-calendar"></i>
                {anime.release.split(' ')[2] || 'N/A'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
