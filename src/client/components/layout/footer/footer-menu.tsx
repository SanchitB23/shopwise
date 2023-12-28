'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const FooterMenuItem = ({ item }: { item: IProduct }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.name);

  useEffect(() => {
    setActive(pathname === item.name);
  }, [pathname, item.name]);

  return (
    <li>
      <Link
        href={item.name}
        className={cn(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
          {
            'text-black dark:text-neutral-300': active,
          },
        )}>
        {item.name}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: IProduct[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: IProduct) => {
          return <FooterMenuItem key={item.name} item={item} />;
        })}
      </ul>
    </nav>
  );
}
