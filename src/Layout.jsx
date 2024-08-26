import { Box, Grid, GridItem, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import LeftBar from './LeftBar';
import LocationComponent from './Components/LocationComponent';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <Grid
      templateAreas={`"header header"
                      "nav main"
                      "nav footer"`}
      gridTemplateRows={'70px 1fr 30px'}
      gridTemplateColumns={'200px 1fr'}
      h='100vh'
      gap='6'
      color='blackAlpha.700'
      fontWeight='bold'
      w="100%"
      bg="beige"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <GridItem 
        area={'header'} 
        className='primary-gradient' 
        padding='10px' 
        w='100%' 
        h='70px'
      >
        <HStack>
          <Image src='/logo.png' alt='logo' w='150px' h='60px' onClick={()=> navigate('/')} cursor='pointer'/>
          <LocationComponent/>
        </HStack>

      </GridItem>

      <GridItem 
        p='20px' 
        bg='white' 
        area={'nav'} 
        borderRadius='15px' 
        borderBottomRadius='0' 
        mt={2} 
        boxShadow='md'
      >
        <Box>
          <LeftBar />
        </Box>
      </GridItem>

      <GridItem
    p="20px"
    mr={2}
    mt={2}
    borderRadius="15px"
    area="main"
    boxShadow="md"
    overflow="auto"
    backgroundImage="url('background.jpeg')"
    backgroundSize="cover" // Ensures the image covers the entire area
    backgroundPosition="center" // Centers the image
  >
    {children}
  </GridItem>

      <GridItem 
        p='6px' 
        bg='white' 
        area={'footer'} 
        borderRadius='15px' 
        borderBottomRadius='0' 
        mr={2} 
        boxShadow='md'
      >
        <Text fontSize='sm'>&copy; TechAid-2024</Text>
      </GridItem>
    </Grid>
  );
}

export default Layout;
