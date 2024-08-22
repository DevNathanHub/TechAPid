import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat, BiShare } from 'react-icons/bi';
import { motion } from 'framer-motion'; // Import framer-motion
import calculateDistance from '../../hooks/calculate-distance';
import useLocation from '../../hooks/use-location';

const TechnicianCard = lazy(() => import('./TechnicianCard')); // Lazy load the TechnicianCard

const TechnicianCardComponent = ({ technician }) => {
  const { location, coords, loading, error } = useLocation();

  if (loading) {
    return <Text>Loading user location...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!coords.latitude || !coords.longitude) {
    console.log("user location coords check", location);
    return <Text>User Location not Provided</Text>;
  }

  const distance = calculateDistance(
    coords.latitude,
    coords.longitude,
    technician.location.latitude,
    technician.location.longitude
  );

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card maxW='sm' variant='outline' borderRadius='30px'> {/* Add 30px radius */}
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar name={technician.name} />
              <Box>
                <Heading size='sm'>{technician.name}</Heading>
                <Text>{technician.specialization}</Text>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody sx={{ textAlign: 'start' }}>
          <Text alignItems='flex-start'>{technician.location.address}</Text>
          <Badge colorScheme={technician.status === 'available' ? "green" : technician.status === 'booked' ? "purple" : "blue"}>
            {technician.status}
          </Badge>
          <Text>{distance.toFixed(2)} km Away</Text>
        </CardBody>
        <CardFooter justify='space-between' flexWrap='wrap' sx={{ '& > button': { minW: '136px' } }}>
          <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
            Request
          </Button>
          <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
            Book
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

TechnicianCardComponent.propTypes = {
  technician: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    specialization: PropTypes.string.isRequired,
    yearsOfExperience: PropTypes.number,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired
    }).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired
};

export default TechnicianCardComponent;
