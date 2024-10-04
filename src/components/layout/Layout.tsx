import { Inter } from 'next/font/google';

export const inter = Inter({
  display: 'block',
  subsets: ['cyrillic', 'latin'],
  preload: true,
  weight: 'variable',
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={inter.style}>{children}</div>;
}
