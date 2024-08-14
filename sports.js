import { Box, Image, Badge, Flex, Button, Icon, Grid, Spinner, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { StarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from "react";
import { api } from './api';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

export function Sports() {
    const { type } = useParams(); // Get type from URL parameter
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.post(`${api}/items`);
            setData(res.data);
        } catch (e) {
            setError("Error fetching data");
            console.error("Error fetching data:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Spinner size="xl" />;
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    return (
        <Grid
            templateColumns={{ base: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: '4', sm: '6', md: '8', lg: '10' }}
            p={{ base: '4', sm: '6', md: '8', lg: '10' }}
            backgroundColor='gray.100'
        >
            {data
                ?.filter(item => item?.type.toLowerCase() === type?.toLowerCase()) // Filter items based on the sport type
                .map((item, index) => (
                    <Box
                        key={index}
                        maxW="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        transition="all 0.3s ease"
                        _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
                    >
                        <Image
                            src={item.Cover_Img
                            }
                            alt={item.imageAlt}
                            width="100%"
                            height="250px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/250"
                        />

                        <Box p="6">
                            <Box display="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                    New
                                </Badge>
                                <Box
                                    color="gray.500"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    ml="2"
                                >
                                    {item.category} &bull; {item.stock} in stock
                                </Box>
                            </Box>

                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {item.title}
                            </Box>

                            <Box>
                                {item.price} USD
                                <Box as="span" color="gray.600" fontSize="sm">
                                    / unit
                                </Box>
                            </Box>

                            <Box display="flex" mt="2" alignItems="center">
                                {Array(5)
                                    .fill("")
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i < item.rating ? "teal.500" : "gray.300"}
                                        />
                                    ))}
                                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                    {item.reviews} reviews
                                </Box>
                            </Box>

                            <Flex mt="4" justify="space-between" align="center">
                                <Button colorScheme="teal" size="sm">
                                    Buy Now
                                </Button>
                                <Button colorScheme="orange" size="sm">
                                    Add to Cart
                                </Button>
                                <Icon as={FaHeart} color="red.400" cursor="pointer" />
                            </Flex>
                        </Box>
                    </Box>
                ))}
        </Grid>
    );
}
