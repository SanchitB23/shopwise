import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/nav';
import TrpcProvider from '@/components/Providers/TrpcProvider';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { SITE_NAME } from '@/constants/global';
import { capitalize } from 'lodash';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${capitalize(SITE_NAME)}`,
    default: capitalize(SITE_NAME),
  },
  description: 'Shop Anything, Shop everything',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen flex flex-col')}>
        <TrpcProvider>
          <Navbar />
          {children}
          <Footer />
        </TrpcProvider>
        <Toaster position={'top-right'} theme={'dark'} richColors />
      </body>
    </html>
  );
}
