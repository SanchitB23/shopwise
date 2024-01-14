import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Product } from '../../../payload-types';
import { validUrls } from '@/utils/get-img-urls';
import Image from 'next/image';
import Link from 'next/link';
import { currencyFormatter } from '@/utils/index';

const ProductCard = ({
  product,
  className,
  imgClassName,
  variant,
}: {
  product: Product;
  className?: string;
  imgClassName?: string;
  variant?: 'small' | 'default' | 'big';
}) => {
  const imageUrls = validUrls(product);
  return (
    <Card
      className={cn(
        'hover:border hover:border-blue-500 transition duration-300 group hover:cursor-pointer h-full transform bg-gray-900 rounded-xl',
        className,
      )}>
      <Link href={`products/${product.slug}`} className={'h-full w-full'}>
        <CardContent
          className={cn('flex h-full w-full relative justify-center items-center ', {
            'flex-col': variant === 'small',
          })}>
          <Image
            src={imageUrls[0]}
            height={500}
            width={500}
            alt={product.title}
            className={cn(
              'object-contain h-3/4 w-3/4 aspect-auto group-hover:scale-150 transition-transform scale-100',
              imgClassName,
            )}
            quality={100}
          />
          <Badge
            className={cn('absolute top-3/4 left-1/4 flex flex-row justify-between pr-0 gap-4', {
              static: variant === 'small',
            })}
            variant={'outline'}>
            <span>{product.title}</span>
            <Badge className={'bg-blue-700 py-1 mr-1 my-0.5 text-white'} variant={'outline'}>
              {currencyFormatter(product.price)}
            </Badge>
          </Badge>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
