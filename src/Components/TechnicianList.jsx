import React, { useState, useMemo, Suspense } from 'react';
import { Grid, GridItem, VStack, Text } from '@chakra-ui/react';
import FiltersDropdowns from './FiltersDropdowns';
import SearchQueryBar from './SearchQueryBar';
import TechnicianCardComponent from './Cards/TechnicianCard';

const TechnicianList = ({ technicians }) => {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const filteredTechnicians = useMemo(() => {
    return technicians.filter(technician => {
      return (
        (!filters.specialization || technician.specialization === filters.specialization) &&
        (!filters.status || technician.status === filters.status) &&
        (!filters.yearsOfExperience || technician.yearsOfExperience >= parseInt(filters.yearsOfExperience, 10)) &&
        (!searchQuery || technician.name.toLowerCase().includes(searchQuery) || technician.specialization.toLowerCase().includes(searchQuery) || technician.location.address.toLowerCase().includes(searchQuery))
      );
    });
  }, [filters, searchQuery, technicians]);

  return (
    <VStack spacing={6} align="stretch">
      <FiltersDropdowns onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
      <SearchQueryBar onSearch={handleSearch} />
     
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
      > 
        <Suspense fallback={<Text>Loading...</Text>}>
          {filteredTechnicians.map(technician => (
            <GridItem key={technician.email}>
              <TechnicianCardComponent technician={technician} />
            </GridItem>
          ))}
        </Suspense>
      </Grid>     
    </VStack>
  );
};

export default TechnicianList;
