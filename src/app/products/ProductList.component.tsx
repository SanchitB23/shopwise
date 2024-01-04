import React from 'react';
import { Product } from '../../payload-types';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/common/productCard';
import Warning from '@/resources/svg/warning';
import ErrorComponent from '@/components/layout/ErrorComponent';
import NoDataFound from '@/resources/svg/no-data';
import { usePathname, useRouter } from 'next/navigation';

const ProductListComponent = ({
  data,
  isLoading,
  isError,
  refetch,
}: {
  data: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => {};
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const clearFilters = () => {
    router.push(pathname);
  };

  if (isError)
    return (
      <div className={'flex justify-center items-center h-full'}>
        <ErrorComponent onBtnClick={() => refetch()} SvgComponent={Warning} />;
      </div>
    );
  if (!isLoading && !isError && !data?.length)
    return (
      <div className={'flex justify-center items-center h-full'}>
        <ErrorComponent
          onBtnClick={clearFilters}
          SvgComponent={NoDataFound}
          btnText={'No data found'}
        />
      </div>
    );
  return (
    <main
      className={'text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid grid-flow-row gap-4'}>
      {isLoading
        ? Array.from({ length: 6 }, (_, i) => (
            <Skeleton
              className={'bg-gray-900 rounded-xl aspect-square transition-opacity'}
              key={i}
            />
          ))
        : data?.map((value, index) => (
            <ProductCard
              product={value}
              key={index}
              className={'bg-gray-900 rounded-xl aspect-square transition-opacity'}
            />
          ))}
    </main>
  );
};

export default ProductListComponent;
