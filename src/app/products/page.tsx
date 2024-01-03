'use client';

import React from 'react';
import { trpc } from '@/trpc/client';
import ProductListComponent from './ProductList.component';
import { Product } from '../../payload-types';
import FilterList, { FilterListProps, IListData } from '@/components/filters';
import { sortByList } from '@/constants/client';

const Page = () => {
  const { data, isLoading } = trpc.productsRouter.getProducts.useQuery(
    {
      cursor: 0,
      query: {},
    },
    { select: ({ items }) => [...items] as Product[] | undefined },
  );

  const { data: categories, isLoading: categoryLoader } = trpc.getCategories.useQuery(undefined, {
    select: data =>
      [
        { label: 'All', value: '' },
        ...data.map(({ title, id }) => ({ label: title as string, value: id })),
      ] as IListData[] | undefined,
  });

  const CategoryFilterProps = {
    list: categories,
    title: 'categories',
    isLoading: categoryLoader,
  } as unknown as FilterListProps;

  return (
    <div className={'container flex h-full flex-1'}>
      <FilterList {...CategoryFilterProps} />
      <div className={'mx-4'}>
        <ProductListComponent data={data} isLoading={isLoading} />
      </div>
      <FilterList list={sortByList} title={'sortBy'} isLoading={false} />
    </div>
  );
};

export default Page;
