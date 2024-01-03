import React from 'react';
import { Product } from '../../payload-types';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/common/productCard';

const ProductListComponent = ({
  data,
  isLoading,
  isError,
}: {
  data: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isError)
    return <div className={'flex justify-center items-center h-full'}>Something Went Wrong</div>;
  if (!isLoading && !isError && !data?.length)
    return <div className={'flex justify-center items-center h-full'}>NO data</div>;
  return (
    <main
      className={'text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid grid-flow-row gap-4'}>
      {isLoading
        ? Array.from({ length: 9 }, (_, i) => (
            <Skeleton
              className={'bg-gray-900 rounded-xl aspect-square transition-opacity'}
              key={i}
            />
          ))
        : data?.map((value, index) => (
            <ProductCard
              product={value}
              key={index}
              className={'bg-gray-900 rounded-xl aspect-square transition-opacity'}
            />
          ))}
    </main>
  );
};

export default ProductListComponent;
