import Link from 'next/link';
import { getFeaturedProducts } from '../temp/functions';
import ProductCard from '@/components/common/productCard';
import { cn } from '@/lib/utils';

export async function Carousel({ className }: { className?: string }) {
  const products = getFeaturedProducts();

  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className={cn('w-full overflow-x-auto pb-6 pt-1', className)}>
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.name}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3">
            <Link href={`/product/${product.name}`} className="relative h-full w-full">
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
