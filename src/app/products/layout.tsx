import React, { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products',
};
const Layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
