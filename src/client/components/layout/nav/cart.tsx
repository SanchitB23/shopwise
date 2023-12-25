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
          className={'transition-all delay-100 rounded-xl relative'}>
          <ShoppingCart className={'h-4 w-4 hover:h-5 hover:w-5'} />
          {count ? (
            <Badge className={'bottom-6 left-6 absolute'} variant={'secondary'}>
              {count}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default Cart;
