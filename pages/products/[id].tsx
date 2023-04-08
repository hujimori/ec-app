import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CartContext from '@/contexts/CartContext';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Product = () => {
  const { addToCart } = useContext(CartContext);

  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id === undefined) return;

    // 仮の商品データをセット
    const fetchedProduct: Product = {
      id: Number(id),
      name: `商品${id}`,
      description: `商品${id}の説明`,
      price: 1000,
    };

    setProduct(fetchedProduct);
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // カートページへ遷移する
  const handleCartPageNavigation = () => {
    router.push('/cart');
  };

  // カートに商品を追加する
  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    console.log('商品はカートへ追加されました。');
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}円</p>
      <ButtonGroup spacing="2">
        <Button variant="ghost" colorScheme="blue" onClick={handleAddToCart}>
          Add to cart
        </Button>
        <Button variant="ghost" colorScheme="blue" onClick={handleCartPageNavigation}>
          カートへ
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Product;
