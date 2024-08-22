// src/Components/Admin/AddTechnicianForm.js
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
} from '@chakra-ui/react';
import api from '../../../config/api';

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
      const response = await fetch(`${baseUrl}/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiGeoKey}`);
      const data = await response.json();
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

    }else{
     setIsManualEntry(false);
     const coords = await fetchCoordinates(technician.location.address);
     return coords
    }

    ;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send technician data to the API
      const response = await api.post('/technicians', technician);
      console.log('Technician added successfully:', response.data);
      onAddTechnician(technician); // Update local state
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
    } catch (error) {
      console.error('Error adding technician:', error);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="lg" maxW="lg">
      <VStack spacing={4}>
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
        <FormControl isRequired>
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
        <Button colorScheme="teal" type="submit" width="full">
          Add Technician
        </Button>
      </VStack>
    </Box>
  );
};

export default AddTechnicianForm;
