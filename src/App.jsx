import { Button, HStack, useColorMode } from "@chakra-ui/react";
import "./App.css";
import LocationComponent from "./Components/LocationComponent";
import RequestService from "./Components/RequestService";


function App() {
  const { colorMode, toggleColorMode } = useColorMode() 

  return (
    <div className="App">
      <header>
        <HStack>
          <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        </HStack>
        
      </header>
      <LocationComponent/>
      <RequestService/>
    </div>
  );
}

export default App;