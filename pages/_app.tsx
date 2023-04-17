import Layout from '@/components/header';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Component } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
