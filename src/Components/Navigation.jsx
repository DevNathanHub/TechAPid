import { HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <HStack spacing={4} p={4}>
      <Link to="/">Location</Link>
      <Link to="/technicians">Technicians</Link>
      <Link to="/add-technician">Add Technician</Link>
    </HStack>
  );
}

export default Navigation;