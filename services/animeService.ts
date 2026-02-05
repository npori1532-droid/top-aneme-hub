import { Anime } from '../types';

const API_URL = 'https://wataru-api.vercel.app/api/topanime';

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
