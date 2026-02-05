import { Anime } from '../types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4/top/anime';

// Fallback data ensures the app always loads something even if the API is down
const FALLBACK_ANIME: Anime[] = [
  {
    rank: "1",
    title: "Frieren: Beyond Journey's End",
    score: "9.14",
    type: "TV",
    release: "Sep 2023 - Mar 2024",
    members: "650,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
    link: "https://myanimelist.net/anime/52991/Sousou_no_Frieren"
  },
  {
    rank: "2",
    title: "Fullmetal Alchemist: Brotherhood",
    score: "9.09",
    type: "TV",
    release: "Apr 2009 - Jul 2010",
    members: "3,300,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/1223/96541l.jpg",
    link: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood"
  },
  {
    rank: "3",
    title: "Steins;Gate",
    score: "9.07",
    type: "TV",
    release: "Apr 2011 - Sep 2011",
    members: "2,500,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/5/73199l.jpg",
    link: "https://myanimelist.net/anime/9253/Steins_Gate"
  },
  {
    rank: "4",
    title: "Gintama°",
    score: "9.06",
    type: "TV",
    release: "Apr 2015 - Mar 2016",
    members: "600,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/3/72078l.jpg",
    link: "https://myanimelist.net/anime/28977/Gintama°"
  },
  {
    rank: "5",
    title: "Attack on Titan Season 3 Part 2",
    score: "9.05",
    type: "TV",
    release: "Apr 2019 - Jul 2019",
    members: "2,200,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/1517/100633l.jpg",
    link: "https://myanimelist.net/anime/38524/Shingeki_no_Kyojin_Season_3_Part_2"
  },
  {
    rank: "6",
    title: "Bleach: Thousand-Year Blood War",
    score: "9.03",
    type: "TV",
    release: "Oct 2022 - Dec 2022",
    members: "550,000",
    thumbnail: "https://cdn.myanimelist.net/images/anime/1764/126627l.jpg",
    link: "https://myanimelist.net/anime/41467/Bleach__Sennen_Kessen-hen"
  }
];

export const fetchTopAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch(JIKAN_API_URL);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform Jikan API response to our Anime interface
    return data.data.map((item: any) => ({
      rank: item.rank?.toString() || "0",
      title: item.title,
      score: item.score?.toString() || "N/A",
      type: item.type || "TV",
      release: item.aired?.string || "N/A",
      members: item.members ? `${item.members.toLocaleString()} members` : "0 members",
      thumbnail: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url,
      link: item.url
    }));

  } catch (error) {
    console.warn("Jikan API failed, using fallback data:", error);
    // Return fallback data instead of throwing, ensuring the app works 100% of the time
    return FALLBACK_ANIME;
  }
};