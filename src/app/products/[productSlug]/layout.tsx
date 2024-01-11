import React, { ReactNode } from 'react';
import RelatedProducts from '@/components/RelatedProducts';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={'h-screen flex flex-col'}>
      <div className={'flex-auto'}>{children}</div>
      <RelatedProducts />
    </main>
  );
};

export default Layout;
