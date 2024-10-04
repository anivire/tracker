import Layout from '@/components/layout/Layout';
import { HotkeyProvider } from '@/providers/HotkeyProvider';
import StoreProvider from '@/providers/StoreProvider';
import '@/styles/globals.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <HotkeyProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </HotkeyProvider>
    </StoreProvider>
  );
}
