import { createContext, useState, ReactNode } from 'react';

// 商品情報を表すインターフェイスを定義する。
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
}

// コンテキスト（Context）は、Reactアプリケーション内でデータをグローバルに保持し、コンポーネント間で状態や関数を共有するために使用される機能である。
// コンテキストを使うことで、コンポーネントの階層を介してプロパティを渡すことなく、データを簡単にアクセスできる。
// カートのコンテキストの値に関連するインターフェイスを定義する。
//// カートの状態、商品をカートに追加する関数、カートから商品を削除する関数が含まれている。
interface CartContextValue {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

// createContext関数を使って、カート用のコンテキストを作成する。
// カートコンテキストの型定義には、先程作成したCartContextValueインターフェイスを使用する。
const CartContext = createContext<CartContextValue>({} as CartContextValue);

// CartProviderコンポーネントのプロパティを定義するインターフェイスである。
// CartProviderは子コンポーネントを受け取る。
interface CartProviderProps {
  children: ReactNode;
}

// CartProviderコンポーネントを定義する。
// このコンポーネントは、カートの状態と、カートに関連する操作を提供するコンテキストプロバイダーである。
export const CartProvider = ({ children }: CartProviderProps) => {
  // useStateフックを使って、カートの状態を管理する。
  // 初期状態は空の配列
  const [cart, setCart] = useState<Product[]>([]);

  // 商品をカートに追加する関数を定義する。
  const addToCart = (product: Product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity = (updatedCart[itemIndex].quantity || 1) + 1;
      setCart(updatedCart);
    } else {
      // カートに商品を追加するため、現在のカートの状態に新しい商品を追加して、setCartで状態を更新する。
      setCart([...cart, product]);
    }
  };

  const value = { cart, addToCart };

  // カートから商品を削除する関数を定義する。
  const removeFromCart = (productId: number) => {
    // カートから商品を削除するため、指定された商品ID以外の商品を含む新しい配列を作成し、setCartで状態を更新する。
    setCart(cart.filter((product) => product.id !== productId));
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
