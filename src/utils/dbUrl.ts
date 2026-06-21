/**
 * Helpers for connecting node-postgres (`pg`) to hosted Postgres (Neon).
 *
 * Two gotchas are handled so the same DATABASE_URL works for migrations,
 * seeding and runtime queries:
 *
 * 1. Neon's pooled URLs include `channel_binding=require`, but `pg` does not
 *    implement SCRAM channel binding and throws when it sees that option.
 * 2. Recent `pg` treats `sslmode=require` (and verify-ca) as `verify-full`,
 *    which strictly validates the CA chain and fails in some build/runtime
 *    environments. Rather than fight the URL's sslmode, we strip it and pass an
 *    explicit `ssl` option (see `dbSsl`).
 */
export function normalizeDbUrl(raw: string | undefined | null): string {
  if (!raw) {
    return '';
  }
  try {
    const url = new URL(raw);
    url.searchParams.delete('channel_binding');
    url.searchParams.delete('sslmode');
    return url.toString();
  } catch {
    return raw;
  }
}

/**
 * SSL options for the `pg` Pool / drizzle-kit. Hosted databases (Neon) require
 * TLS; we don't verify the CA chain so it works across build and runtime
 * environments. Local databases (localhost / PGlite) use no SSL.
 */
export function dbSsl(raw: string | undefined | null): { rejectUnauthorized: boolean } | false {
  if (!raw) {
    return false;
  }
  try {
    const { hostname } = new URL(raw);
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return false;
    }
    return { rejectUnauthorized: false };
  } catch {
    return false;
  }
}
