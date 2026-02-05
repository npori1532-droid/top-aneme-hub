import { Anime } from '../types';

const API_URL = 'https://wataru-api.vercel.app/api/topanime';

export const fetchTopAnime = async (): Promise<Anime[]> => {
  try {
    // Attempt 1: Direct Fetch
    const response = await fetch(API_URL);
    if (response.ok) {
      return await response.json();
    }
    // If direct fetch returns 4xx/5xx (like the 404 you encountered), throw to try proxy
    throw new Error(`Direct fetch failed with status: ${response.status}`);
  } catch (error) {
    console.warn("Direct fetch failed, attempting via proxy...", error);
    
    // Attempt 2: CORS Proxy
    // We use a proxy to bypass potential CORS restrictions or server-side blocks
    // Using allorigins.win as a reliable public proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`;
    
    try {
      const proxyResponse = await fetch(proxyUrl);
      if (!proxyResponse.ok) {
        throw new Error(`Proxy fetch failed with status: ${proxyResponse.status}`);
      }
      return await proxyResponse.json();
    } catch (proxyError) {
      console.error("Failed to fetch anime data:", proxyError);
      throw proxyError;
    }
  }
};