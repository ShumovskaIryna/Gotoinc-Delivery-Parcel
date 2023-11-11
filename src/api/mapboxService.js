import axios from 'axios'

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const MAPBOX_URL = import.meta.env.VITE_MAPBOX_URL;

const instance = axios.create({
  baseURL: MAPBOX_URL,
  timeout: 5000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
  }
});

export async function fetchCityResults(cityName) {
  try {    
    const response = await instance.get(`mapbox.places/${cityName}.json`, {
      params: {
        access_token: MAPBOX_API_KEY,
        types: 'place'
      }
    });
    return response.data.features;
  } catch (error) {
    console.error('Error fetching city results:', error);
    return [];
  }
}

