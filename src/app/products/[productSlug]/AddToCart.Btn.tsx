'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '../../../payload-types';
import { Plus } from 'lucide-react';

interface Props {
  product: Product;
}
const AddToCartBtn = ({ product }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const addToCart = () => {
    console.log('product', product, selectedQuantity);
  };
  return (
    <>
      <Button className={'w-full capitalize'} onClick={addToCart}>
        <Plus />
        <span className={'flex-1'}>add to cart - {product.quantity}</span>
      </Button>
    </>
  );
};

export default AddToCartBtn;
