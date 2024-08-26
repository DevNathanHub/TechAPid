import React from 'react'
import TechnicianList from '../Components/TechnicianList'
import techniciansData from '../assets/technicians-data'
import { Box } from '@chakra-ui/react'

function TechniciansPage() {
  return (
    <Box>
      <TechnicianList technicians={techniciansData}/>
    </Box>
  )
}

export default TechniciansPage