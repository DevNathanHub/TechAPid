import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
    },
  }),
};

const components = {
  Input: {
    baseStyle: (props) => ({
      field: {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
        _hover: {
          borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
        },
        _focus: {
          borderColor: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
          boxShadow: '0 0 0 1px teal.500',
        },
      },
    }),
  },
  Menu: {
    baseStyle: (props) => ({
      list: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
      item: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
        },
      },
    }),
  },
  Box: {
    baseStyle: (props) => ({
      bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
    }),
  },
};

const theme = extendTheme({
  config,
  styles,
  components,
});

export default theme;
