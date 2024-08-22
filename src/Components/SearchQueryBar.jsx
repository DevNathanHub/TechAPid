import React from 'react';
import { Input, Box } from '@chakra-ui/react';

const SearchQueryBar = ({ onSearch }) => {
  return (
    <Box mb={4}>
      <Input 
        placeholder="Search by name or location..." 
        onChange={e => onSearch(e.target.value)}
      />
    </Box>
  );
};

export default SearchQueryBar;
