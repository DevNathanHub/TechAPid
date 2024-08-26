import React, { useState } from 'react';
import { Box, Button, Divider, FormControl, FormLabel, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle email and password signup logic here
    toast({
      title: 'Signup attempt',
      description: `Email: ${email}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    // Navigate to another page or handle post-signup logic here
    navigate('/login');
  };

  return (
    <VStack spacing={4} p={4} maxWidth="400px" margin="0 auto">
                <Heading>Signup</Heading>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </FormControl>
        <FormControl id="confirm-password" isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4} width="full">
          Sign Up
        </Button>
        <Divider mt={4} />
        <Box mt={4}>
          <Link to='/login'>Already have an account? Log in here</Link>
        </Box>
      </form>
    </VStack>
  );
};

export default Signup;
