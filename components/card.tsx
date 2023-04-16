import { Box, Button, Heading, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
  name: string;
  description: string;
  price: number;
};

export default function Card({ name, description, price }: Props) {
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Heading as="h4" size="md" mr={2}>
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            ${price}
          </Text>
        </Box>

        <Text mt="2" color={textColor}>
          {description}
        </Text>

        <Stack direction="row" mt="6" spacing={4} align="center">
          <Button colorScheme="green" size="sm">
            Add to cart
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
