import React from 'react';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const count = 3; //todo will be dynamic
  return (
    <Sheet>
      <SheetTrigger asChild className={'relative'}>
        <Button
          variant={'outline'}
          size={'icon'}
          className={
            'rounded-xl relative shadow-lg transition-transform transform group hover:bg-transparent'
          }>
          <ShoppingCart className={'h-4 w-4 group-hover:scale-105 transition-transform'} />
          {count ? (
            <Badge className={'bottom-6 left-6 absolute rounded-xl'} variant={'secondary'}>
              {count}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default Cart;
