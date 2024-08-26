import React, { createContext, useState, useEffect } from 'react';

// Create a Context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [tabName, setTabName] = useState('');
  const [technicianId, setSelectedTechnicianId] = useState(null); // can be uid from firebase

  // Load context from local storage when the component mounts
  useEffect(() => {
    const storedTabName = localStorage.getItem('tabName');
    const storedTechnicianId = localStorage.getItem('technicianId');

    if (storedTabName) {
      setTabName(storedTabName);
    }

    if (storedTechnicianId) {
      setSelectedTechnicianId(storedTechnicianId);
    }
  }, []);

  // Save context to local storage whenever it changes
  useEffect(() => {
    if (tabName) {
      localStorage.setItem('tabName', tabName);
    }
  }, [tabName]);

  useEffect(() => {
    if (technicianId) {
      localStorage.setItem('technicianId', technicianId);
    }
  }, [technicianId]);

  return (
    <AppContext.Provider value={{ tabName, setTabName, technicianId, setSelectedTechnicianId }}>
      {children}
    </AppContext.Provider>
  );
};
