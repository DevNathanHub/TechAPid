import React from 'react';
import { Input, Box } from '@chakra-ui/react';

const SearchQueryBar = ({ onSearch }) => {
  return (
    <Box mb={4}>
      <Input 
        placeholder="Search by name, specialization or location..." 
        onChange={e => onSearch(e.target.value)}
        borderRadius='30px'
        color='black'
        shadow='md'
      />
    </Box>
  );
};

export default SearchQueryBar;
