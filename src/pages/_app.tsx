import { HotkeyProvider } from '@/components/providers/HotkeyProvider';
import '@/styles/globals.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HotkeyProvider>
      <Component {...pageProps} />
    </HotkeyProvider>
  );
}
