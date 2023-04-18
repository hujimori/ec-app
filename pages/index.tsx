import Header from '@/components/header';
import { useAuthContext } from '@/contexts/AuthContext';
import CartContext from '@/contexts/CartContext';
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
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const userContext = useAuthContext();
  console.log(userContext.user?.emailVerified);
  useEffect(() => {
    async function fetchProducts() {
      const fetchProducts = await getProducts();
      setProducts(fetchProducts);
    }
    fetchProducts();
  }, []);

  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  // カートに商品を追加する
  const handleAddToCart = (product: Product) => {
    if (!product) return;

    const cartItem: CartItem = {
      id: Number(product.id),
      name: product.name,
      price: product.price.unit_amount,
      description: product.description,
      priceId: product.price.id,
    };

    addToCart(cartItem);
    console.log('商品はカートへ追加されました。');
    router.push('/cart');
  };

  return (
    <>
      <Header />
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
                  <Button variant="ghost" colorScheme="blue" onClick={() => handleAddToCart(product)}>
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </Box>
        <Box>
          <Text>{userContext.user?.emailVerified}</Text>
        </Box>
      </Flex>
    </>
  );
}
