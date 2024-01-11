import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
};
const Layout = ({ children }: { children: ReactNode }) => {
  return <div className={'min-h-full w-screen container'}>{children}</div>;
};

export default Layout;
