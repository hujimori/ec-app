import { CartProvider } from '@/contexts/CartContext';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Component } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  );
}

export default MyApp;
