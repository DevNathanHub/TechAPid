import React, { useState } from 'react';
import { Box, Button, Divider, FormControl, FormLabel, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const { login } = useAuth(); // Destructure login function from useAuth
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login logic (Replace with actual login logic)
    const userData = { email }; // You would have more data in a real scenario
    login(userData);

    toast({
      title: 'Login Successful',
      description: `Welcome back, ${email}!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/profile'); // Navigate to a protected route
  };

  return (
    <VStack spacing={4} p={4} maxWidth="400px" margin="0 auto">
      <Heading>Login</Heading>
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
        <Button type="submit" colorScheme="blue" mt={4} width="full">
          Login
        </Button>
        <Divider mt={4} />
        <Box mt={4}>
          <Link to='/signup'>Create Account Instead</Link>
        </Box>
      </form>
    </VStack>
  );
};

export default Login;
