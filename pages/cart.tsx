import { FormEvent, useContext } from 'react';
import CartContext from '@/contexts/CartContext';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();

    const selectedPrices: { quantity: number | undefined; price: number }[] = [];

    cart.map((item) => {
      selectedPrices.push({
        quantity: item.quantity,
        price: item.price,
      });
    });

    const checkoutSession = {
      automatic_tax: true,
      tax_id_collection: true,
      collect_shipping_address: true,
      allow_promotion_codes: true,
      line_items: selectedPrices,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      metadata: {
        key: 'value',
      },
      mode: 'payment',
      payment_method_types: ['card', 'sepa_debit', 'sofort'],
    };
  };

  return (
    <>
      {cart.map((item) => {
        <Box key={item.id} mb={4}>
          <Heading as="h2" size="md">
            {item.name}
          </Heading>
          <Text>{item.description}</Text>
          <Text>価格: {item.price}円</Text>
          <Button colorScheme="red" size="sm" mt={2} onClick={() => removeFromCart(item.id)}>
            削除
          </Button>
        </Box>;
      })}

      <Button colorScheme="blue" onClick={handleCheckout}>
        決済する
      </Button>
    </>
  );
};

export default Cart;
