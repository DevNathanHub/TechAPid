import React, { lazy, Suspense, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  Skeleton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@chakra-ui/react';
import { BsChatLeftText, BsThreeDotsVertical } from 'react-icons/bs';
import { BiChat } from 'react-icons/bi';
import { motion } from 'framer-motion';
import calculateDistance from '../../hooks/calculate-distance';
import useLocation from '../../hooks/use-location';
import { CiStar } from 'react-icons/ci';
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa6';

const TechnicianCard = lazy(() => import('./TechnicianCard'));

const TechnicianCardComponent = ({ technician }) => {
  const { location, coords, loading, error } = useLocation();
  const { setSelectedTechnicianId } = useContext(AppContext);
  const navigate = useNavigate();

  const onScheduleClick = (technician) => {
    setSelectedTechnicianId(technician.email);
    navigate('/schedules');
  };

  if (loading) {
    return (
      <Card maxW='sm' borderRadius='30px' variant='outline' className='glass' bg='transparent'>
        <CardHeader>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Skeleton circle size='12' borderRadius='15px'/>
              <Box>
                <Skeleton height='20px' width='150px' mb='2' borderRadius='15px' />
                <Skeleton height='15px' width='100px' borderRadius='15px'/>
              </Box>
            </Flex>
            <Skeleton height='24px' width='24px' borderRadius='15px'/>
          </Flex>
        </CardHeader>
        <CardBody>
          <Skeleton height='20px' width='200px' mb='2' />
          <Skeleton height='20px' width='100px' mb='2' />
          <Skeleton height='20px' width='100px' />
        </CardBody>
        <CardFooter>
          <Skeleton height='30px' width='80px' mr='2' />
          <Skeleton height='30px' width='80px' />
        </CardFooter>
      </Card>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!coords.latitude || !coords.longitude) {
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
      <Box 
        maxW='sm' 
        borderWidth='1px' 
        borderRadius='30px' 
        overflow='hidden' 
        variant='outline' 
        className='glass' 
        bg='transparent' 
        color='black'
        p='4' // Adding padding around the box content
      >
        <HStack spacing='4' align='start' mb='4'>
          <Avatar name={technician.name} shadow="md" />
          <Flex flex='1' justify='space-between' alignItems='center'>
            <Box>
              <Heading size='sm'>{technician.name}</Heading>
              <Text fontWeight='400' color='gray.700'>{technician.specialization}</Text>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                variant='ghost'
                colorScheme='gray'
                aria-label='Options'
                icon={<BsThreeDotsVertical />}
              />
              <MenuList>
                <MenuItem icon={<CiStar />}>Add to Favorites</MenuItem>
                <MenuItem icon={<BsChatLeftText />}>Review</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>

        <Box mb='4'>
          <Badge 
            colorScheme={technician.status === 'available' ? "green" : technician.status === 'booked' ? "purple" : "blue"} 
            borderRadius='full'
            px='2'
            py='1'
            mb='2'
          >
            {technician.status}
          </Badge>

          <Text fontWeight='semibold' noOfLines={1} mb='2'>
            {technician.location.address}
          </Text>

          <Text>
            {distance.toFixed(2)} km away
          </Text>
        </Box>

        <Box display='flex' alignItems='center' mb='4'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <CiStar
                key={i}
                color={i < technician.rating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Text ml='2' color='gray.600' fontSize='sm'>
            {technician.reviewCount} reviews
          </Text>
        </Box>

        <HStack spacing='4'>
          <Button 
            flex='1' 
            variant='outline' 
            borderRadius='15px' 
            leftIcon={<FaClock />} 
            onClick={() => onScheduleClick(technician)} 
            color='black'
            backgroundColor='white'
          >
            Schedule
          </Button>
          <Button 
            flex='1' 
            variant='ghost' 
            borderRadius='15px' 
            leftIcon={<BsChatLeftText />} 
            color='black'
          >
            Chat
          </Button>
        </HStack>
      </Box>
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
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
  }).isRequired
};

export default TechnicianCardComponent;
