import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, HStack, useColorMode } from '@chakra-ui/react';
import "./App.css";
import LocationComponent from "./Components/LocationComponent";
import TechnicianList from "./Components/TechnicianList";
import Navigation from './Components/Navigation'; // Assuming Navigation is in Components folder
import techniciansData from './assets/technicians-data';
import AddTechnicianForm from './Components/Admin/AddTechnicianForm';
import { useState } from 'react';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [technicians, setTechnicians] = useState(techniciansData);

  const handleAddTechnician = (newTechnician) => {
    setTechnicians((prevTechnicians) => [...prevTechnicians, newTechnician]);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <HStack>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </HStack>
          <Navigation /> {/* Navigation Component */}
        </header>
        <Routes>
          <Route path="/" element={<LocationComponent onAddTechnician={handleAddTechnician} />} />
          <Route path="/technicians" element={<TechnicianList technicians={techniciansData} />} />
          <Route path="/add-technician" element={<AddTechnicianForm onAddTechnician={handleAddTechnician}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
