import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme.js'; // Ensure the path is correct
import { AppProvider } from './Context/AppContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
         <AppProvider>
        <App />
      </AppProvider>
      </AuthProvider>
     
      
    </ChakraProvider>
  </React.StrictMode>
);
