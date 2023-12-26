import React from 'react';
import { getFeaturedProducts } from '../temp/functions';
import ProductCard from '@/components/common/productCard';

const FeaturedProducts = () => {
  const [product1, product2, product3] = getFeaturedProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
      <ProductCard product={product1} className={'col-span-1 md:col-span-2'} />
      <div className="col-span-1 grid grid-rows-2 gap-4">
        <ProductCard product={product2} />
        <ProductCard product={product3} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
