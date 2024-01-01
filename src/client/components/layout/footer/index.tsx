import { SITE_NAME } from '@/constants/global';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu: IProduct[] = [];
  const copyrightName = SITE_NAME || '';

  return (
    <footer className="text-sm mt-4">
      {/*<div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">*/}
      {/*  <div>*/}
      {/*    <Link className="flex items-center gap-2 md:pt-1" href="/">*/}
      {/*      <Image src={Logo} alt={'Logo'} className={'h-10 w-10'} />*/}
      {/*      <span className="uppercase">{SITE_NAME}</span>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*  <Suspense*/}
      {/*    fallback={*/}
      {/*      <div className="flex h-[188px] w-[200px] flex-col gap-2">*/}
      {/*        <div className={skeleton} />*/}
      {/*        <div className={skeleton} />*/}
      {/*        <div className={skeleton} />*/}
      {/*        <div className={skeleton} />*/}
      {/*        <div className={skeleton} />*/}
      {/*        <div className={skeleton} />*/}
      {/*      </div>*/}
      {/*    }>*/}
      {/*    <FooterMenu menu={menu} />*/}
      {/*  </Suspense>*/}
      {/*</div>*/}
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0 capitalize">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in India</p>
          <p className="md:ml-auto">
            <a href="https://vercel.com">Crafted by ▲ Vercel</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
