'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import ProductCard from '@/components/common/productCard';
import { Skeleton } from '@/components/ui/skeleton';

export function Carousel({ className }: { className?: string }) {
  const { data, isLoading, isError } = trpc.productsRouter.getFeaturedProducts.useQuery({
    limit: 10,
    query: {},
  });

  if (isLoading) {
    return (
      <div className={cn('w-full overflow-x-auto pb-6 pt-1', className)}>
        <ul className="flex gap-4">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton
              key={index}
              className={
                'relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3'
              }
            />
          ))}
        </ul>
      </div>
    );
  }
  if (isError) return null;

  const carouselProducts = [...data.items, ...data.items, ...data.items];

  return (
    <div className={cn('w-full overflow-x-auto pb-6 pt-1', className)}>
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.title}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3">
            <Link href={`/product/${product.title}`} className="relative h-full w-full">
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
