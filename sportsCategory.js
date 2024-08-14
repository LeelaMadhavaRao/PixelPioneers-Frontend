import { useState } from 'react';
import { Box, Image, Grid, GridItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { Sports } from './sports'; // Import the Sports component

const properties = [
  {
    imageUrl: 'https://i.pinimg.com/originals/85/b9/b4/85b9b4605207163aeacdaf78aa30ecb1.jpg',
    imageAlt: 'Rear view of modern home with pool',
    title: 'CRICKET',
    description: 'A popular bat-and-ball game played between two teams of eleven players.',
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNL9-_xCj3gduRaBBWzgRj-9y3JNsQ3XDoMg&s',
    imageAlt: 'Football field',
    title: 'FOOTBALL',
    description: 'Known as soccer in some countries, this is a team sport played with a spherical ball between two teams of eleven players.',
  },
 
];

export function Sportspage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSportClick = (type) => {
    navigate(`/sports/${type.toLowerCase()}`); // Navigate to the sports route with the selected sport type
  };

  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={{ base: '4', sm: '6', md: '8', lg: '10' }}
        p={{ base: '4', sm: '6', md: '8', lg: '10' }}
        backgroundColor='gray.100'
      >
        {properties.map((property, index) => (
          <GridItem
            key={index}
            borderWidth='1px'
            borderColor='gray.200'
            borderRadius='lg'
            overflow='hidden'
            bg='white'
            boxShadow='md'
            transition='all 0.3s ease'
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)', cursor: 'pointer' }}
            onClick={() => handleSportClick(property.title)} // Navigate to the selected sport's page on click
          >
            <Box position='relative' width='100%' height='250px'>
              <Image
                src={property.imageUrl}
                alt={property.imageAlt}
                width='100%'
                height='100%'
                objectFit='cover'
                fallbackSrc='https://via.placeholder.com/300'
              />
            </Box>

            <Box p='6'>
              <Text
                fontWeight='bold'
                fontSize='2xl'
                mb='2'
                _hover={{ color: 'blue.500' }}
              >
                {property.title}
              </Text>
              <Text
                fontSize='md'
                color='gray.700'
                mb='4'
              >
                {property.description}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
