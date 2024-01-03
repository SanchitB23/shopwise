import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { createUrl } from '@/utils/index';
import { usePathname, useSearchParams } from 'next/navigation';

function FilterItem({ item, title }: { item: any; title: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get(title) === item.value;
  const q = searchParams.get('q');
  const categories = searchParams.get('categories');
  const sortBy = searchParams.get('sortBy');

  const existingParams =
    title === 'categories' ? sortBy && { sortBy } : categories && { categories };

  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...existingParams,
      ...(item.value && item.value.length && { [title]: item.value }),
    }),
  );
  const DynamicTag = active ? 'p' : Link;

  return (
    <li className="mt-2 flex text-sm text-white" key={item.label}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={cn('w-full hover:underline hover:underline-offset-4 capitalize', {
          'underline underline-offset-4': active,
        })}>
        {item.label}
      </DynamicTag>
    </li>
  );
}

export default FilterItem;
