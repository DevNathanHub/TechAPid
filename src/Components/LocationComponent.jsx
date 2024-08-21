import React from 'react';
import useLocation from '../hooks/use-location';

const LocationComponent = () => {
  const { location, coords, loading, error } = useLocation();

  if (loading) return <div>Loading location data...</div>;
  if (error) return <div>Error Loading Your Location</div>;

  return (
    <div>
      <h1>Location Information</h1>
      {location ? (
        <>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Latitude:</strong> {coords.latitude}</p>
          <p><strong>Longitude:</strong> {coords.longitude}</p>
        </>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
};

export default LocationComponent;
