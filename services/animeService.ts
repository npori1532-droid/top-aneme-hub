import { Anime } from '../types';

// Use the local proxy in production to bypass CORS, but keep direct link for localhost if needed
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal 
  ? 'https://wataru-api.vercel.app/api/topanime' 
  : '/api/anime';

export const fetchTopAnime = async (): Promise<Anime[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    throw error;
  }
};