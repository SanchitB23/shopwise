// import Cart from 'components/cart';
// import OpenCart from 'components/cart/open-cart';
// import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import Search from './search';
import { SITE_NAME } from '@/constants/global';
import Cart from '@/components/layout/nav/cart';
import Image from 'next/image';
import Logo from '../../../resources/logo/logo_transparent.png';
import { NAV_MENU } from '@/constants/client';

export default async function Navbar() {
  const menu = NAV_MENU;
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <Image src={Logo} alt={'Logo'} className={'h-16 w-16'} />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map(item => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="underline-offset-4 hover:underline text-neutral-400 hover:text-neutral-300">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Link href={'/sign-in'}>Sign In</Link>
          <Cart />
        </div>
      </div>
    </nav>
  );
}
