import { ChakraProvider } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import Head from 'next/head';

import { StoreProvider } from 'easy-peasy';
import store from '@/store/store';

import customTheme from '@/styles/theme';
import { AuthProvider } from '@/lib/auth';

import '@/styles/scroll.css';
import '@/styles/anim.css';

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Orion</title>
        <link
          rel="shortcut icon"
          type="image/png"
          href="./assets/orion-sm.png"
        />
      </Head>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <StoreProvider store={store}>
        <AuthProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </AuthProvider>
      </StoreProvider>
    </ChakraProvider>
  );
};

export default App;
