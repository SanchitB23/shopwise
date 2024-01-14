'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../../hooks/useCart';
import { ScrollArea } from '@/components/ui/scroll-area';
import CartItem from '@/components/Cart/cartItem';
import { currencyFormatter } from '@/utils/index';
import { sumBy } from 'lodash';
import Link from 'next/link';

export default function CartSheet() {
  const { items, addItem, removeItem } = useCart();
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
          {items.length ? (
            <Badge className={'bottom-6 left-6 absolute rounded-xl'}>{items.length}</Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        {items.length ? (
          <section className={'flex flex-col justify-between gap-6 pb-6 h-full'}>
            <ScrollArea>
              {items.map(item => (
                <CartItem
                  item={item}
                  key={item.product.id}
                  onAddItem={() => addItem(item.product)}
                  onRemoveItem={() => removeItem(item.product.id)}
                />
              ))}
            </ScrollArea>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className={'capitalize rounded-full'}>
                  <SheetClose asChild>
                    <Link href={'/cart'}>proceed to checkout</Link>
                  </SheetClose>
                </Button>
              </SheetClose>
              <section className={'flex flex-col gap-2 mb-6'}>
                <div className={'flex justify-between border-b-2 pb-2'}>
                  <span className={'text-gray-400 text-sm capitalize'}>taxes</span>
                  <span>{currencyFormatter(0)}</span>
                </div>
                <div className={'flex justify-between border-b-2 pb-2'}>
                  <span className={'text-gray-400 text-sm capitalize'}>shipping</span>
                  <span className={'text-gray-400 text-sm capitalize'}>calculated at checkout</span>
                </div>
                <div className={'flex justify-between border-b-2 pb-2'}>
                  <span className={'text-gray-400 text-sm capitalize'}>total</span>
                  <span>
                    {currencyFormatter(sumBy(items, item => item.product.price * item.quantity))}
                  </span>
                </div>
              </section>
            </SheetFooter>
          </section>
        ) : (
          <div className={'flex flex-col gap-4 h-full items-center mt-28'}>
            <ShoppingCart className={'h-16 w-16'} />
            <h2 className={'capitalize text-2xl font-bold'}>your cart is empty.</h2>
            <SheetClose asChild>
              <Button className={'capitalize rounded-full'} variant={'secondary'}>
                <SheetClose asChild>
                  <Link href={'/products'}>start shopping now</Link>
                </SheetClose>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
