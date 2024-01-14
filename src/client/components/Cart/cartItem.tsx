import React from 'react';
import { CartItem } from '../../hooks/useCart';
import { currencyFormatter } from '@/utils/index';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { validUrls } from '@/utils/get-img-urls';
import Link from 'next/link';
import { SheetClose } from '@/components/ui/sheet';

interface Props {
  item: CartItem;
  onAddItem: () => void;
  onRemoveItem: () => void;
}
const CartItem = ({ item, onRemoveItem, onAddItem }: Props) => {
  const imageUrls = validUrls(item.product);
  return (
    <div className={'mt-4'}>
      <div className={'flex'}>
        <section className={'max-w-16 rounded-lg bg-secondary relative'}>
          <div className="absolute z-40 -mt-2 ml-[51px] bg-accent rounded-full p-px">
            <X className={'h-4 w-4 text-slate-300'} />
          </div>
          <SheetClose asChild>
            <Link
              href={`/products/${item.product.slug}`}
              className={'w-full h-full p-0 bg-transparent'}>
              <Button className={'w-full h-full p-0'} variant={'outline'}>
                <Image
                  src={imageUrls[0]}
                  height={500}
                  width={500}
                  alt={item.product.title}
                  quality={100}
                />
              </Button>
            </Link>
          </SheetClose>
        </section>
        <section className={'flex-1 flex pl-2'}>
          <section className={'flex-1'}>
            <h3 className={'max-w-32 font-medium'}>{item.product.title}</h3>
          </section>
          <section className={'flex flex-col gap-2 items-end'}>
            <span>{currencyFormatter(item.product.price * item.quantity)}</span>
            <Button
              size={'sm'}
              variant={'outline'}
              className={'hover:bg-transparent rounded-full min-w-24 max-h-9 cursor-default'}>
              <Minus
                onClick={onRemoveItem}
                className={'cursor-pointer h-4 w-4 text-secondary-foreground'}
              />
              <span className={'flex-1 cursor-text'}>{item.quantity}</span>
              <Plus
                onClick={onAddItem}
                className={'cursor-pointer h-4 w-4 text-secondary-foreground'}
              />
            </Button>
          </section>
        </section>
      </div>
      <hr className={'mt-3'} />
    </div>
  );
};

export default CartItem;
