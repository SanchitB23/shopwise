'use client';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { validUrls } from '@/utils/get-img-urls';
import { trpc } from '@/trpc/client';
import { Product } from '../../../payload-types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { IContentType, Serialize } from '@/components/common/richTextSerializer';
import AddToCartBtn from './AddToCart.Btn';
import Loading from './loading';
import Error from './error';

const ProductDetails = ({ slug }: { slug: string }) => {
  const { data, isLoading, isError } = trpc.productsRouter.getProductData.useQuery(
    { slug },
    { select: ({ productData }) => productData as Product },
  );
  if (isLoading) {
    return <Loading />;
  }

  if (isError) return <Error />;

  const imageUrls = validUrls(data);

  return (
    <Card className={'bg-gray-900 lg:h-[70vh]'}>
      <CardContent className={'flex flex-col lg:flex-row h-full'}>
        {/*// @ts-ignore*/}
        <section className={'flex-1 text-center'} style={{ textAlign: '-webkit-center' }}>
          <Carousel className="w-10/12 h-full">
            <CarouselContent className={'h-full'}>
              {imageUrls.map((url, index) => (
                <CarouselItem key={index} className={'flex justify-center items-center'}>
                  <Image
                    src={url}
                    height={500}
                    width={500}
                    alt="Picture of the author"
                    className={cn('object-contain lg:h-3/4 lg:w-3/4 aspect-auto scale-125')}
                    quality={100}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {imageUrls.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </section>
        <section className={'flex-1 flex flex-col p-6'}>
          <CardTitle className={'lg:text-6xl mb-2 text-5xl'}>{data?.title}</CardTitle>
          <Badge
            className={
              'bg-blue-700 py-1 mr-1 my-0.5 text-white w-fit px-3 min-w-20 justify-center text-sm'
            }
            variant={'outline'}>
            ₹ {data?.price}
          </Badge>
          <hr className={'my-7'} />
          <CardDescription>
            <Serialize content={data?.description as IContentType[]} />
          </CardDescription>
          <CardFooter className={'mt-auto'}>
            <AddToCartBtn product={data} />
          </CardFooter>
        </section>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
