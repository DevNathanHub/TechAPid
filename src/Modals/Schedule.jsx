  import React, { useContext, useEffect, useState } from 'react';
  import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Select,
    useDisclosure,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Tooltip,
    Grid,
    GridItem,
    useToast
  } from '@chakra-ui/react';
  import DatePicker from 'react-datepicker';
  import 'react-datepicker/dist/react-datepicker.css';
  import techniciansData from '../assets/technicians-data';
  import { AppContext } from '../Context/AppContext';
  import { FaPlus } from 'react-icons/fa6';

  function Schedule() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { technicianId } = useContext(AppContext);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const toast = useToast();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [technician, setTechnician] = useState(technicianId);
    const [serviceType, setServiceType] = useState('');
    const [schedules, setSchedules] = useState([]);

    // List of service types
    const serviceTypes = ['Plumbing', 'Electrical', 'HVAC', 'General Maintenance'];

    // Load saved schedules from local storage on mount
    useEffect(() => {
      const savedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
      setSchedules(savedSchedules);
    }, []);

    // Function to save schedule
    const saveSchedule = () => {
      const newSchedule = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phoneNumber,
        location,
        technician,
        serviceType,
        date: selectedDate.toLocaleString()
      };

      const updatedSchedules = [...schedules, newSchedule];
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      
      toast({
        title: "Request Submitted.",
        description: "Your technician request has been submitted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
    };

    // Function to handle email copy with toast notification
    const handleEmailCopy = (email) => {
      navigator.clipboard.writeText(email);
      toast({
        title: "Email Copied.",
        description: "The email address has been copied to your clipboard.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    };

    return (
      <>
        <Button onClick={onOpen} position='fixed' right='20px' top='120px' mb='20px' shadow='md' zIndex='1000' borderRadius='rounded'><FaPlus/></Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Request a Technician</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Select Technician</FormLabel>
                    <Select
                      placeholder="Select technician"
                      value={technician}
                      onChange={(e) => setTechnician(e.target.value)}
                    >
                      {techniciansData.map((tech, index) => (
                        <option key={index} value={tech.email}>
                          {`${tech.specialization} (${tech.name}) - ${tech.status}`}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={1}>
                  <FormControl>
                    <FormLabel>Select Service Type</FormLabel>
                    <Select
                      placeholder="Select service type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                    >
                      {serviceTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Select Date & Time</FormLabel>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      showTimeSelect
                      dateFormat="Pp"
                      placeholderText="Select date and time"
                      customInput={<Input />}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveSchedule}>
                Submit Request
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Schedule Table */}
        <TableContainer mt={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Location</Th>
                <Th>Technician</Th>
                <Th>Service Type</Th>
                <Th>Date & Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {schedules.map((schedule) => (
                <Tr key={schedule.id}>
                  <Td>{schedule.firstName}</Td>
                  <Td>{schedule.lastName}</Td>
                  <Td>
                    <Tooltip label="Click to copy" aria-label="A tooltip">
                      <span
                        style={{
                          display: 'inline-block',
                          maxWidth: '150px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleEmailCopy(schedule.email)}
                      >
                        {schedule.email}
                      </span>
                    </Tooltip>
                  </Td>
                  <Td>{schedule.phoneNumber}</Td>
                  <Td>{schedule.location}</Td>
                  <Td>{schedule.technician}</Td>
                  <Td>{schedule.serviceType}</Td>
                  <Td>{schedule.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  }

  export default Schedule;
