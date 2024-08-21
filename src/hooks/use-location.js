  import { useEffect, useState } from "react";
  import axios from "axios";

  const APIkey = import.meta.env.VITE_APP_GEO_API_KEY;

  function useLocation() {
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState({ latitude: null, longitude: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLocationInfo = async (latitude, longitude) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
      try {
        const { data } = await axios.get(url);
        if (data.status.code === 200 && data.results.length > 0) {
          return data.results[0].formatted;
        } else {
          throw new Error("Reverse geolocation request failed.");
        }
      } catch (err) {
        throw new Error("Failed to fetch location data.");
      }
    };

    const getLocation = async () => {
      if (navigator.geolocation) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
          if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              async (pos) => {
                const { latitude, longitude } = pos.coords;
                setCoords({ latitude, longitude });
                try {
                  const locationData = await fetchLocationInfo(latitude, longitude);
                  setLocation(locationData);
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              },
              (err) => {
                setError(`ERROR(${err.code}): ${err.message}`);
                setLoading(false);
              },
              { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
          } else if (permissionStatus.state === "denied") {
            setError("Geolocation permission denied");
            setLoading(false);
          }
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    useEffect(() => {
      getLocation();
    }, []);

    return {
      location,
      coords,
      loading,
      error,
    };
  }

  export default useLocation;
