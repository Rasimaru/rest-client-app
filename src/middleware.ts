import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './lib/routes';
import { getLocalizedPath } from './lib/utils';

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return NextResponse.next();
  }
  const url = new URL(req.url);
  const pathname = url.pathname;

  // i18n
  const response = await intlMiddleware(req);

  // Auth
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: '__Secure-next-auth.session-token'
  });

  const isPrivateRoute = [ROUTES.client, ROUTES.variables, ROUTES.history].some((path) =>
    pathname.startsWith(path)
  );

  const isAuthRoute = [ROUTES.signin, ROUTES.signup].some((path) => pathname.startsWith(path));

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(getLocalizedPath(pathname, ROUTES.main), req.url));
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL(getLocalizedPath(pathname, ROUTES.signin), req.url));
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
