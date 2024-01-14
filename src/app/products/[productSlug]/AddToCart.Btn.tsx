'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '../../../payload-types';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../../../client/hooks/useCart';
import { find } from 'lodash';

interface Props {
  product: Product;
  isDisabled?: boolean;
}
const AddToCartBtn = ({ product, isDisabled = false }: Props) => {
  const { items, addItem, removeItem } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(
    find(items, ['product.id', product?.id])?.quantity ?? 0,
  );
  useEffect(() => {
    const itemInStorage = find(items, ['product.id', product?.id]);
    setSelectedQuantity(itemInStorage?.quantity ?? 0);
  }, [items, product?.id]);

  function onAdd() {
    setSelectedQuantity(prevState => prevState + 1);
    addItem(product!);
  }

  function onRemove() {
    setSelectedQuantity(prevState => prevState - 1);
    removeItem(product!.id);
  }

  if (selectedQuantity < 1)
    return (
      <>
        <Button className={'w-full capitalize mt-4'} onClick={onAdd} disabled={isDisabled}>
          <Plus />
          <span className={'flex-1'}>add to cart</span>
        </Button>
      </>
    );

  return (
    <Button className={'w-full capitalize cursor-default mt-4'} disabled={isDisabled}>
      <Minus onClick={onRemove} className={'cursor-pointer'} />
      <span className={'flex-1'}>{selectedQuantity}</span>
      <Plus onClick={onAdd} className={'cursor-pointer'} />
    </Button>
  );
};

export default AddToCartBtn;
