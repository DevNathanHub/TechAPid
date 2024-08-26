import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Textarea,
  Grid,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddTechnicianForm = ({ onAddTechnician }) => {
  const [technician, setTechnician] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    yearsOfExperience: '',
    location: {
      latitude: '',
      longitude: '',
      address: '',
    },
    status: 'available',
  });

  const [isManualEntry, setIsManualEntry] = useState(false);

  const toast = useToast(); // Initialize useToast
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTechnician((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setTechnician((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const fetchCoordinates = async (address) => {
    try {
      console.log(`Fetching coordinates for address: ${address}`);
      // Example API URL and key, replace with actual values if needed
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;
      const apiGeoKey = import.meta.env.VITE_APP_GEO_API_KEY;
      const response = await fetch(`${baseUrl}/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiGeoKey}`);
      const data = await response.json();
      console.log('Geocoding API response:', data);
      if (data.results && data.results[0]) {
        const coordinates = data.results[0].geometry;
        setTechnician((prev) => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          },
        }));
      } else {
        console.error("Geocoding API returned an unexpected response.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleCoordinateChange = (e) => {
    setIsManualEntry(true);
    handleLocationChange(e);
  };

  const handleAutofill = async () => {
    if (!technician.location.address) {
      console.error("Please enter an address to autofill coordinates.");
      return;
    } else {
      setIsManualEntry(false);
      const coords = await fetchCoordinates(technician.location.address);
      return coords;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Technician data to be submitted:', technician);
      // Simulate API request
      console.log('Sending technician data to API...');
      // const response = await api.post('/technicians', technician);
      // console.log('Technician added successfully:', response.data);

      // For debugging purposes, we'll just log the data
      console.log('Technician added successfully:', technician);

      // Update local state
      onAddTechnician(technician);

      // Reset form
      setTechnician({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        yearsOfExperience: '',
        location: {
          latitude: '',
          longitude: '',
          address: '',
        },
        status: 'available',
      });

      // Show success toast
      toast({
        title: "Technician added.",
        description: "The technician has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Navigate to success page
      navigate('/success');
    } catch (error) {
      console.error('Error adding technician:', error);

      // Show error toast
      toast({
        title: "Error.",
        description: "There was an error adding the technician.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="30px" maxW="lg">
      <Heading mb={4}>Become Technician</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={technician.name}
            onChange={handleInputChange}
            placeholder="Enter technician name"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={technician.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={technician.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Specialization</FormLabel>
          <Select
            name="specialization"
            value={technician.specialization}
            onChange={handleInputChange}
            placeholder="Select specialization"
          >
            <option value="Plumber">Plumber</option>
            <option value="Plumbing Technician">Plumbing Technician</option>
            <option value="HVAC Technician">HVAC Technician</option>
            <option value="Carpentry Technician">Carpentry Technician</option>
            <option value="Electrical Technician">Electrical Technician</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Years of Experience</FormLabel>
          <Input
            name="yearsOfExperience"
            type="number"
            value={technician.yearsOfExperience}
            onChange={handleInputChange}
            placeholder="Enter years of experience"
          />
        </FormControl>
        <FormControl isRequired gridColumn="span 2">
          <FormLabel>Location</FormLabel>
          <Textarea
            name="address"
            value={technician.location.address}
            onChange={handleLocationChange}
            placeholder="Enter location address"
          />
          <Button onClick={handleAutofill} mt={2} colorScheme="blue">
            Autofill Coordinates
          </Button>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
            <Input
              name="latitude"
              type="number"
              value={technician.location.latitude}
              onChange={handleCoordinateChange}
              placeholder="Latitude"
            />
            <Input
              name="longitude"
              type="number"
              value={technician.location.longitude}
              onChange={handleCoordinateChange}
              placeholder="Longitude"
            />
          </Grid>
        </FormControl>
      </Grid>
      <Button colorScheme="teal" type="submit" width="full" mt={4}>
        Submit Application
      </Button>
    </Box>
  );
};

export default AddTechnicianForm;
