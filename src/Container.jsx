import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { AppContext } from './Context/AppContext';
import Home from './Home';
import TechnicianList from './Components/TechnicianList';
import Schedules from './Components/Schedules';

function Container({ children }) {
  const { tabName } = useContext(AppContext);

  useEffect(() => {
    console.log(`tabName has been set to: ${tabName}`);
    alert(`Expecting to render component for tabName: ${tabName}`);
  }, [tabName]);

  let content;
  switch (tabName) {
    case 'technicians':
      console.log("Rendering TechnicianList component");
      content = <TechnicianList />;
      break;
    case 'bookings':
      console.log("Rendering Bookings component");
      content = <Schedules />;
      break;
    default:
      console.log("Rendering Home component (default)");
      content = <Home />;
      break;
  }

  return (
    <Flex maxW="container.sm" className="back-svg" color="#262626">
      {content}
      {children}
    </Flex>
  );
}

export default Container;
