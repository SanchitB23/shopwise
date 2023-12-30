import React from 'react';
import NotFoundSvg from '@/resources/svg/not-found';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className={'container flex justify-center items-center h-full flex-col'}>
      <NotFoundSvg />
      <Button className={'my-10 animate-pulse'} variant={'secondary'}>
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
