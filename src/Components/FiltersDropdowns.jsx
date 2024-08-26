import React from 'react';
import { Select, HStack, VStack, Button } from '@chakra-ui/react';

// Dummy data arrays for dropdown options
const specializations = [
  "Plumber",
  "HVAC ",
  "Carpentry Technician",
  "Electrical Technician"
];

const statuses = [
  "Available",
  "Booked",
  "Unavailable"
];

const experienceLevels = [
  "1+ years",
  "3+ years",
  "5+ years",
  "10+ years"
];

const FiltersDropdowns = ({ onFilterChange, onResetFilters }) => {
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4} bg='white' p={2} borderRadius='16px' shadow='md'>
        <Select 
          placeholder="Specialization" 
          onChange={e => onFilterChange('specialization', e.target.value)} 
          size='sm' 
          borderRadius='16px'
        >
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </Select>

        <Select 
          placeholder="Status" 
          onChange={e => onFilterChange('status', e.target.value)} 
          size='sm' 
          borderRadius='15px'
        >
          {statuses.map(status => (
            <option key={status} value={status.toLowerCase()}>{status}</option>
          ))}
        </Select>
        
        <Select 
          placeholder="Years of Experience" 
          onChange={e => onFilterChange('yearsOfExperience', e.target.value)} 
          size='sm' 
          borderRadius='15px'
        >
          {experienceLevels.map(level => (
            <option key={level} value={level.split(' ')[0]}>{level}</option>
          ))}
        </Select>
        
        <Button onClick={onResetFilters} colorScheme="red" size='sm' width='150px'>
          Reset 
        </Button>
      </HStack>
    </VStack>
  );
};

export default FiltersDropdowns;
