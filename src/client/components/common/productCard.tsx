import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product, className }: { product: IProduct; className?: string }) => {
  return (
    <Card
      className={cn(
        'hover:border hover:border-blue-500 transition duration-300 group hover:cursor-pointer h-full transform bg-gray-900 rounded-xl',
        className,
      )}>
      <CardContent className={'flex h-full w-full relative'}>
        <Image
          src={product.image}
          height={500}
          width={500}
          alt="Picture of the author"
          className={
            'object-contain h-full w-full aspect-auto group-hover:scale-105 transition-transform'
          }
          quality={100}
        />
        <Badge
          className={'absolute top-3/4 left-1/4 flex flex-row min-w-24 justify-between pr-0 gap-4'}
          variant={'outline'}>
          <span>{product.name}</span>
          <Badge className={'bg-blue-700 py-1 mr-1 my-0.5 text-white'}> ₹ {product.price}</Badge>
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
