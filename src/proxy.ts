import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { auth0 } from './lib/auth0';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

/** Matches /dashboard and /:locale/dashboard (the admin area). */
function isProtectedRoute(pathname: string) {
  return /^\/(?:[a-z]{2}\/)?dashboard(?:\/|$)/.test(pathname);
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth0 owns its own routes (/auth/login, /auth/logout, /auth/callback, …).
  if (pathname.startsWith('/auth')) {
    return auth0.middleware(request);
  }

  // Run the Auth0 middleware so the session cookie is refreshed and getSession()
  // works inside route handlers / server components.
  const authRes = await auth0.middleware(request);

  // API routes (e.g. /api/admin/upload) must NOT go through i18n routing, which
  // would treat them as localized pages and 404 them.
  if (pathname.startsWith('/api')) {
    return authRes;
  }

  // Gate the admin dashboard — redirect anonymous visitors to Auth0 login.
  if (isProtectedRoute(pathname)) {
    const session = await auth0.getSession(request);
    if (!session) {
      const loginUrl = new URL('/auth/login', request.nextUrl.origin);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // i18n routing for everything else; carry over any cookies Auth0 set.
  const intlRes = handleI18nRouting(request);
  for (const cookie of authRes.cookies.getAll()) {
    intlRes.cookies.set(cookie);
  }
  return intlRes;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/_next`, `/_vercel` or `monitoring`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!_next|_vercel|monitoring|.*\\..*).*)',
};
