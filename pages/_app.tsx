import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Component } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
