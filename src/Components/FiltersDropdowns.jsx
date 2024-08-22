import React from 'react';
import { Select, HStack, VStack, Button } from '@chakra-ui/react';

const FiltersDropdowns = ({ onFilterChange, onResetFilters }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <Select placeholder="Specialization" onChange={e => onFilterChange('specialization', e.target.value)}>
          <option value="Plumber">Plumber</option>
          <option value="HVAC Technician">HVAC Technician</option>
          <option value="Carpentry Technician">Carpentry Technician</option>
          <option value="Electrical Technician">Electrical Technician</option>
        </Select>

        <Select placeholder="Status" onChange={e => onFilterChange('status', e.target.value)}>
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="unavailable">Unavailable</option>
        </Select>
        
        <Select placeholder="Years of Experience" onChange={e => onFilterChange('yearsOfExperience', e.target.value)}>
          <option value="1">1+ years</option>
          <option value="3">3+ years</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
        </Select>
      </HStack>

      <Button onClick={onResetFilters} colorScheme="red">
        Reset Filters
      </Button>
    </VStack>
  );
};

export default FiltersDropdowns;
