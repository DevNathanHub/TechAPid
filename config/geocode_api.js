export default function getGeoApiKey() {
    const geo_api = import.meta.env.VITE_APP_GEO_API_KEY;
    return geo_api;
  } 
