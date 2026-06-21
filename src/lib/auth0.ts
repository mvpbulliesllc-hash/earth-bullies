import { Auth0Client } from '@auth0/nextjs-auth0/server';

/**
 * Auth0 client for the admin. Reads configuration from the environment:
 * AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_SECRET and the
 * app base URL (APP_BASE_URL, falling back to NEXT_PUBLIC_APP_URL). The SDK
 * auto-mounts /auth/login, /auth/logout and /auth/callback via the middleware.
 */
export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  appBaseUrl: process.env.APP_BASE_URL ?? process.env.NEXT_PUBLIC_APP_URL,
});
