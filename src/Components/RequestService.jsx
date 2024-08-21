import { Box, Grid, GridItem } from "@chakra-ui/react";
import techniciansData from "../assets/technicians-data";
import TechnicianCard from "./Cards/TechnicianCard";

function RequestService() {
  if (!techniciansData || techniciansData.length === 0) {
    return <p>No technicians available at the moment.</p>;
  }

  return (
    <Box bg='beige' p={4}>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
      >
        {techniciansData.map((technician) => (
          <GridItem key={technician.email}>
            <TechnicianCard technician={technician} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default RequestService;