import { NextRequest, NextResponse } from 'next/server';
import { getServerSideUser } from './server/utils/getServerSideUser';

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const { user } = await getServerSideUser(cookies);

  if (user && ['/sign-in', '/sign-up'].includes(nextUrl.pathname))
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);

  if (!user && ['/cart'].includes(nextUrl.pathname))
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`);

  return NextResponse.next();
}
