    import React, { useState } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import { Button, HStack } from '@chakra-ui/react';
    import Layout from './Layout';
    import LocationComponent from './Components/LocationComponent';
    import AddTechnicianForm from './Components/Admin/AddTechnicianForm';
    import TechniciansPage from './Technicians';
    import techniciansData from './assets/technicians-data';
    import "./App.css";
    import Schedules from './Components/Schedules';
    import Profile from './Components/Profile';
    import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute component
    import Signup from './Components/Signup';
    import Login from './Components/Login';
  import Help from './Components/Help';

    function App() {
      const [technicians, setTechnicians] = useState(techniciansData);

      const handleAddTechnician = (newTechnician) => {
        setTechnicians((prevTechnicians) => [...prevTechnicians, newTechnician]);
      };

      return (
        <Router>
          <Layout>
            <HStack justifyContent="space-between" p={4}>
              {/* Add buttons or other elements here if needed */}
            </HStack>
            <Routes>
              <Route path="/" element={<LocationComponent />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/help" element={<Help />} />

              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/technicians" element={<TechniciansPage technicians={technicians} />} />
              <Route path="/apply" element={<AddTechnicianForm onAddTechnician={handleAddTechnician} />} />
            </Routes>
          </Layout>
        </Router>
      );
    }

    export default App;
