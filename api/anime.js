export default async function handler(request, response) {
  const API_URL = 'https://wataru-api.vercel.app/api/topanime';

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    // Set caching headers to improve performance
    response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch data' });
  }
}