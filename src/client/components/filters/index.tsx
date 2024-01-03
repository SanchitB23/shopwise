import React from 'react';
import FilterItem from '@/components/filters/item';
import { Skeleton } from '@/components/ui/skeleton';

export interface IListData {
  label: string;
  value: string;
}

export type Title = 'categories' | 'sortBy';
export interface FilterListProps {
  isLoading: boolean;
  title: Title;
  list?: IListData[];
}

function FilterItemList({ list, isLoading, title }: FilterListProps) {
  if (isLoading) {
    return Array.from({ length: 5 }, (_, index) => (
      <Skeleton className="h-3 w-full mt-2" key={index} />
    ));
  }
  return (
    <>
      {list &&
        list.map((item: any, i: React.Key | null | undefined) => (
          <FilterItem key={i} item={item} title={title} />
        ))}
    </>
  );
}

// Todo Implement Responsiveness
const FilterList = ({ list, title, isLoading }: FilterListProps) => {
  return (
    <aside>
      <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block capitalize">
        {title}
      </h3>
      <ul className="hidden md:block">
        <FilterItemList list={list} isLoading={isLoading} title={title} />
      </ul>
    </aside>
  );
};

export default FilterList;
