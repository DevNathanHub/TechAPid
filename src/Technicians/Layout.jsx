import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Layout from './Layout';

const RequestTechnicianLayout = ({ children }) => {
  return (
    <Layout>
      <Flex direction="column" align="center" maxW="1200px" mx="auto" w="full">
        <Box as="section" w="full" mb={4}>
          {/* Header or Hero Section */}
          <Box bg="blue.500" p={6} borderRadius="md" textAlign="center" color="white">
            <Box fontSize="3xl" fontWeight="bold">Request a Technician</Box>
            <Box mt={2}>Find and hire a skilled technician in your area</Box>
          </Box>
        </Box>
        <Box as="section" w="full" p={4} bg="white" borderRadius="md" boxShadow="md">
          {children}
        </Box>
      </Flex>
    </Layout>
  );
};

export default RequestTechnicianLayout;
