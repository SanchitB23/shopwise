'use client';

import React from 'react';
import ProductCard from '@/components/common/productCard';
import { trpc } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import Warning from '@/resources/svg/warning';
import ErrorComponent from '@/components/layout/ErrorComponent';

const FeaturedProducts = () => {
  const { data, isLoading, isError, refetch, isRefetching } =
    trpc.productsRouter.getFeaturedProducts.useQuery();

  if (isLoading || isRefetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80vh]">
        <Skeleton className={'h-full bg-gray-900 rounded-xl col-span-1 md:col-span-2 '} />
        <div className="col-span-1 grid grid-rows-2 gap-4">
          <Skeleton className={'h-full bg-gray-900 rounded-xl '} />
          <Skeleton className={'h-full bg-gray-900 rounded-xl '} />
        </div>
      </div>
    );
  }
  if (isError) return <ErrorComponent onBtnClick={() => refetch()} SvgComponent={Warning} />;

  const [product1, product2, product3] = data.items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[80vh]">
      <ProductCard product={product1} className={'col-span-1 md:col-span-2'} />
      <div className="col-span-1 grid grid-rows-2 gap-4">
        <ProductCard product={product2} />
        <ProductCard product={product3} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
