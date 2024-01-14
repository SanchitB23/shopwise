import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Loading = () => {
  return (
    <Card className={'bg-gray-900 h-full'}>
      <CardContent className={'flex flex-col lg:flex-row h-full'}>
        {/*// @ts-ignore*/}
        <section className={'flex-1 flex justify-center items-center p-4 pt-8'}>
          <Skeleton className={'h-full w-full'} />
        </section>
        <section className={'flex-1 flex flex-col p-6'}>
          <CardTitle className={'text-7xl mb-2'}>
            <Skeleton className={'h-16 w-full'} />
          </CardTitle>
          <hr className={'my-7'} />
          <CardDescription>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton className={'h-6 w-full my-4'} key={index} />
            ))}
          </CardDescription>
          <CardFooter className={'mt-auto'}>
            <Button className={'w-full capitalize'} disabled>
              <Plus />
              <span className={'flex-1'}>add to cart</span>
            </Button>
          </CardFooter>
        </section>
      </CardContent>
    </Card>
  );
};

export default Loading;
