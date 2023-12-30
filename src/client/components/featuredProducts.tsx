'use client';

import React from 'react';
import ProductCard from '@/components/common/productCard';
import { trpc } from '@/trpc/client';

const FeaturedProducts = () => {
  const { data, isLoading, isError } = trpc.productsRouter.getFeaturedProducts.useQuery({
    limit: 10,
    query: {},
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) return <div>Dikkat hai kuch...</div>;
  const [product1, product2, product3] = data.items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
      <ProductCard product={product1} className={'col-span-1 md:col-span-2'} />
      <div className="col-span-1 grid grid-rows-2 gap-4">
        <ProductCard product={product2} />
        <ProductCard product={product3} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
