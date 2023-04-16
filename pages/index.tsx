import { getProducts } from '@/lib/firebase/firebaseUtils';
import { Product } from '@/lib/types/products';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import { Console } from 'console';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchProducts = await getProducts();
      setProducts(fetchProducts);
    }
    fetchProducts();
  }, []);
  return (
    <>
      <Flex justifyContent="center">
        <Box maxW="700px" w="100%">
          {products.map((product) => (
            <Card key={product.id} maxW="sm">
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="md">{product.name}</Heading>
                  <Text>{product.description}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    {product.price.unit_amount}円
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
          ;
        </Box>
      </Flex>
    </>
  );
}
