import React, { useEffect, useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimeCard from './components/AnimeCard';
import AnimeModal from './components/AnimeModal';
import ThreeBackground from './components/ThreeBackground';
import { fetchTopAnime } from './services/animeService';
import { Anime, SortOption } from './types';

const App: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('rank');
  const [filterType, setFilterType] = useState('All');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    // Fetch Data
    const loadData = async () => {
      try {
        const data = await fetchTopAnime();
        setAnimeList(data);
        setError(null);
      } catch (err) {
        console.error("Data load error:", err);
        setError("Failed to load anime data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // PWA Install Event Listener
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Filtering and Sorting
  const filteredAndSortedAnime = useMemo(() => {
    let result = [...animeList];

    // Search
    if (searchQuery) {
      result = result.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter Type
    if (filterType !== 'All') {
      result = result.filter(a => a.type.includes(filterType));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortOption === 'rank') return parseInt(a.rank) - parseInt(b.rank);
      if (sortOption === 'score') return parseFloat(b.score) - parseFloat(a.score);
      // Simple logic for popularity based on members string "1,234,567 members"
      if (sortOption === 'popularity') {
         const memA = parseInt(a.members.replace(/,/g, '').split(' ')[0]);
         const memB = parseInt(b.members.replace(/,/g, '').split(' ')[0]);
         return memB - memA;
      }
      return 0;
    });

    return result;
  }, [animeList, searchQuery, sortOption, filterType]);

  const uniqueTypes = ['All', 'TV', 'Movie', 'OVA', 'Special'];

  if (loading) {
    return (
        <div className="min-h-screen bg-darker flex items-center justify-center relative overflow-hidden">
             <ThreeBackground />
             <div className="text-center z-10">
                 <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <h2 className="text-2xl font-bold text-white tracking-widest animate-pulse">LOADING...</h2>
             </div>
        </div>
    );
  }

  if (error && animeList.length === 0) {
    return (
        <div className="min-h-screen bg-darker flex items-center justify-center text-white">
            <div className="text-center p-8 bg-card rounded-xl border border-red-500/30">
                <i className="fa-solid fa-circle-exclamation text-4xl text-red-500 mb-4"></i>
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 bg-primary px-4 py-2 rounded hover:bg-violet-600">Retry</button>
            </div>
        </div>
    );
  }

  const featuredAnime = animeList.length > 0 ? animeList[0] : null;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ThreeBackground />
      
      <Header 
        onSearch={setSearchQuery} 
        onInstallClick={handleInstallClick} 
        showInstallButton={showInstallBtn}
      />

      <main className="flex-grow pt-16">
        
        {/* Hero Section */}
        {featuredAnime && !searchQuery && (
            <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src={featuredAnime.thumbnail} alt="Hero" className="w-full h-full object-cover opacity-30 blur-sm scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-darker via-darker/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-darker via-darker/60 to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="md:w-2/3">
                        <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-semibold mb-4 animate-fade-in-up">
                            #{featuredAnime.rank} Top Rated
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight animate-fade-in-up delay-100 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                            {featuredAnime.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-300 mb-6 text-sm md:text-base animate-fade-in-up delay-200">
                            <span className="flex items-center gap-1"><i className="fa-solid fa-star text-yellow-400"></i> {featuredAnime.score}</span>
                            <span>|</span>
                            <span>{featuredAnime.type}</span>
                            <span>|</span>
                            <span>{featuredAnime.release}</span>
                        </div>
                        <div className="flex gap-4 animate-fade-in-up delay-300">
                            <button 
                                onClick={() => setSelectedAnime(featuredAnime)}
                                className="bg-primary hover:bg-violet-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2 group"
                            >
                                <i className="fa-solid fa-play group-hover:scale-110 transition-transform"></i> Watch Now
                            </button>
                             <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold transition-all backdrop-blur-md border border-white/10">
                                + My List
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Filters & Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="trending">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white border-l-4 border-primary pl-3">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Anime'}
                </h2>

                <div className="flex flex-wrap gap-3">
                    {/* Sort Dropdown */}
                    <select 
                        className="bg-card text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                    >
                        <option value="rank">Rank</option>
                        <option value="score">Score</option>
                        <option value="popularity">Popularity</option>
                    </select>

                    {/* Type Filter */}
                    <div className="flex bg-card rounded-lg p-1 border border-white/10">
                        {uniqueTypes.map(type => (
                             <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterType === type || (filterType === 'All' && type === 'All') ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                             >
                                {type}
                             </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredAndSortedAnime.map((anime) => (
                    <AnimeCard 
                        key={anime.rank + anime.title} 
                        anime={anime} 
                        onClick={setSelectedAnime} 
                    />
                ))}
            </div>

            {filteredAndSortedAnime.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <i className="fa-solid fa-ghost text-4xl mb-4"></i>
                    <p>No anime found matching your criteria.</p>
                </div>
            )}
        </section>

      </main>

      <Footer />
      
      <AnimeModal 
        anime={selectedAnime} 
        isOpen={!!selectedAnime} 
        onClose={() => setSelectedAnime(null)} 
      />
    </div>
  );
};

export default App;