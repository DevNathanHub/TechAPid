import {  VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <VStack spacing={4} p={4}>
      <Link to="/">Location</Link>
      <Link to="/technicians">Technicians</Link>
      <Link to="/add-technician">Add Technician</Link>
    </VStack>
  );
}

export default Navigation;