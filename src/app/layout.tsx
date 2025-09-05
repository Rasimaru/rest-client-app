import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'lorem',
  description: 'lorem'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
