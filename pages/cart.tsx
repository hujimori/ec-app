import { useContext } from 'react';
import CartContext from '@/contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h1>カート</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}円 × {product.quantity}
            <button onClick={() => removeFromCart(product.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
