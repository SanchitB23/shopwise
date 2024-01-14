import React, { ReactNode } from 'react';
import RelatedProducts from '@/components/RelatedProducts';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={'min-h-screen flex flex-col'}>
      {children}
      <RelatedProducts />
    </main>
  );
};

export default Layout;
