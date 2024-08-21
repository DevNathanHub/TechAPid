const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  const convertToRadians = (degreeValue) => (degreeValue * Math.PI) / 180;
  const earthRadiusInKilometers = 6371; // Radius of the Earth in kilometers

  const deltaLatitude = convertToRadians(latitude2 - latitude1);
  const deltaLongitude = convertToRadians(longitude2 - longitude1);

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(convertToRadians(latitude1)) * Math.cos(convertToRadians(latitude2)) *
    Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusInKilometers * centralAngle; // Distance in kilometers
};

export default calculateDistance;
