import React from 'react';
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, Skeleton, SkeletonCircle, SkeletonText, Button } from '@chakra-ui/react';
import { BiChat, BiShare } from 'react-icons/bi';

const SkeletonCard = () => {
  return (
    <Card maxW='sm' variant='outline' borderRadius='30px'> {/* Matching borderRadius */}
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <SkeletonCircle size='10' />
            <Box flex='1'>
              <SkeletonText mt='4' noOfLines={2} spacing='4' />
            </Box>
          </Flex>
          <Skeleton height='20px' width='20px' />
        </Flex>
      </CardHeader>
      <CardBody>
        <SkeletonText mt='4' noOfLines={3} spacing='4' />
      </CardBody>
      <CardFooter justify='space-between' flexWrap='wrap' sx={{ '& > button': { minW: '136px' } }}>
        <Button flex='1' variant='ghost' isDisabled leftIcon={<BiChat />}>
          <Skeleton height='20px' width='70px' />
        </Button>
        <Button flex='1' variant='ghost' isDisabled leftIcon={<BiShare />}>
          <Skeleton height='20px' width='70px' />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
