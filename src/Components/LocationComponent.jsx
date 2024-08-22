import React from 'react';
import { HStack, VStack, Text, Box } from '@chakra-ui/react';
import { FaLocationArrow } from 'react-icons/fa';
import useLocation from '../hooks/use-location';

const LocationComponent = () => {
  const { location, coords, loading, error } = useLocation();

  if (loading) return <Text>Loading location data...</Text>;
  if (error) return <Text>Error Loading Your Location</Text>;

  return (
    <Box p={2} maxW="sm" ml="auto">
      {location ? (
        <VStack align="start" spacing={1}>
          <HStack spacing={1} align="center">
            <FaLocationArrow size="12px" />
            <Text fontWeight="bold" fontSize="xs">My Location:</Text>
            <Text fontSize="xs">{location}</Text>
          </HStack>
        </VStack>
      ) : (
        <Text fontSize="sm">No location data available.</Text>
      )}
    </Box>
  );
};

export default LocationComponent;
