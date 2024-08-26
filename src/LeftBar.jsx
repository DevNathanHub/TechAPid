import {
    Heading,
    HStack,
    Tab,
    TabList,
    Tabs,
    VStack,
    useColorMode,
    useColorModeValue,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
  } from '@chakra-ui/react';
  import React from 'react';
  import { AiOutlineSchedule } from 'react-icons/ai';
  import { FaGear, FaMoon, FaQuestion, FaSun, FaDesktop, FaUser } from 'react-icons/fa6'; // Import icons
  import { GrUserWorker } from 'react-icons/gr';
  import { SlEnvolopeLetter } from 'react-icons/sl';
  import { TbLogout } from 'react-icons/tb';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from './Context/AuthContext';
  
  function LeftBar() {
    const { colorMode, setColorMode } = useColorMode();
    const navigate = useNavigate();
    const { logout } = useAuth(); // Destructure logout function from useAuth
  
    // Define color values based on color mode
    const tabBg = useColorModeValue('gray.100', 'gray.700');
    const tabSelectedBg = useColorModeValue('blue.500', 'blue.300');
    const tabSelectedColor = useColorModeValue('white', 'black');
    const iconHoverBg = useColorModeValue('blue.500', 'blue.300');
    const menuBg = useColorModeValue('white', 'gray.800');
    const menuItemHoverBg = useColorModeValue('gray.100', 'gray.700');
    
    const handleThemeChange = (theme) => {
      setColorMode(theme);
    };
  
    const handleLogout = () => {
      logout(); // Call the logout function from context
      navigate('/login'); // Redirect to login page after logout
    };
  
    return (
      <VStack align="start">
        <Tabs variant="unstyled">
          <TabList>
            <VStack align="stretch">
              <Tab
                onClick={() => navigate('technicians')}
                _selected={{ color: tabSelectedColor, bg: tabSelectedBg }}
                gap={2}
                width="100%" 
                justifyContent="space-between"
                bg={tabBg}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                borderRadius='15px'
              >
                <GrUserWorker />
                Technicians
              </Tab>
              <Tab
                onClick={() => navigate('/schedules')}
                _selected={{ color: tabSelectedColor, bg: tabSelectedBg }}
                gap={2}
                width="100%" 
                justifyContent="space-between"
                bg={tabBg}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                borderRadius='15px'
              >
                <AiOutlineSchedule />
                Schedules
              </Tab>
              <Tab
                onClick={() => navigate('/apply')}
                _selected={{ color: tabSelectedColor, bg: tabSelectedBg }}
                gap={2}
                width="100%" 
                justifyContent="space-between"
                bg={tabBg}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
                borderRadius='15px'
              >
                <SlEnvolopeLetter/>
                Apply Job
              </Tab>
            </VStack>
  
            <HStack align="stretch" position="fixed" bottom="20px" left="20px">
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FaGear />}
                  borderRadius="60px"
                  shadow="lg"
                  _hover={{ bg: iconHoverBg }}
                />
                <MenuList bg={menuBg}>
                  <MenuItem icon={<FaSun />} onClick={() => handleThemeChange('light')} _hover={{ bg: menuItemHoverBg }}>
                    Light Mode
                  </MenuItem>
                  <MenuItem icon={<FaMoon />} onClick={() => handleThemeChange('dark')} _hover={{ bg: menuItemHoverBg }}>
                    Dark Mode
                  </MenuItem>
                  <MenuItem icon={<FaDesktop />} onClick={() => handleThemeChange('system')} _hover={{ bg: menuItemHoverBg }}>
                    System Default
                  </MenuItem>
                  <Divider/>
                  <MenuItem icon={<TbLogout />} onClick={handleLogout} _hover={{ bg: menuItemHoverBg }} color='red'>
                    Logout 
                  </MenuItem>
                </MenuList>
              </Menu>
              <Tab
                onClick={() => navigate('/help')}
                _selected={{ color: tabSelectedColor, bg: tabSelectedBg }}
                borderRadius="60px"
                shadow="lg"
                bg={tabBg}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
              >
                <FaQuestion />
              </Tab>
              <Tab
                onClick={() => navigate('/profile')}
                _selected={{ color: tabSelectedColor, bg: tabSelectedBg }}
                borderRadius="60px"
                shadow="lg"
                bg={tabBg}
                _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
              >
                <FaUser />
              </Tab>
            </HStack>
          </TabList>
        </Tabs>
      </VStack>
    );
  }
  
  export default LeftBar;
  