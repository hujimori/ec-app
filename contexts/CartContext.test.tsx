import { fireEvent, render, screen } from '@testing-library/react';
import CartContext, { CartProvider } from './CartContext';
import { ReactNode, useContext } from 'react';
import { describe } from 'node:test';

// テスト用のコンポーネント
// テスト用のコンポーネント
const TestComponent = () => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  return (
    <>
      <button onClick={() => addToCart({ id: 1, name: 'Test Product', description: 'Test Description', price: 10 })}>
        Add to Cart
      </button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

const renderWithContext = (component: ReactNode) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe('CartContext', () => {
  test('adds an item to the cart', () => {
    renderWithContext(<TestComponent />);
    const button = screen.getByText('Add to Cart');
    fireEvent.click(button);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  test('remove an item from the cart', () => {
    renderWithContext(<TestComponent />);
    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    const removeButton = screen.getByText('Remove from Cart');
    fireEvent.click(removeButton);

    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });
});
