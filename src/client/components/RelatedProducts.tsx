'use client';
import React from 'react';
import { Product } from '../../payload-types';
import { trpc } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ProductCard from '@/components/common/productCard';

const RelatedProducts = () => {
  const { data, isLoading, isError, refetch, isRefetching } =
    trpc.productsRouter.getProducts.useQuery(
      { query: {} },
      {
        select: ({ items }) => [...items] as Product[] | undefined,
      },
    );
  return (
    <section>
      <h3 className={'text-xl font-bold mt-4 mb-2'}>Related Products</h3>
      <ScrollArea className="w-full whitespace-nowrap ">
        <ul className="flex w-full space-x-4 p-4 ">
          {isLoading
            ? Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className={'relative aspect-square h-3/4 w-56'} />
              ))
            : data?.map(value => (
                <ProductCard
                  product={value}
                  className={'h-56 flex-1'}
                  variant={'small'}
                  key={value.slug}
                />
              ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default RelatedProducts;
