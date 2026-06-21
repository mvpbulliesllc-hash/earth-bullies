/**
 * Normalize a Postgres connection string for node-postgres (`pg`).
 *
 * Two Neon + `pg` gotchas are handled here so the same URL works for
 * migrations, seeding and runtime queries:
 *
 * 1. Neon's pooled URLs include `channel_binding=require`, but `pg` does not
 *    implement SCRAM channel binding and throws when it sees that option.
 * 2. Recent `pg` treats `sslmode=require` as `verify-full`, which strictly
 *    validates the CA chain and fails in environments (e.g. the Vercel build)
 *    where Neon's chain isn't verifiable. We downgrade an existing strict
 *    sslmode to `no-verify` — still encrypted (TLS), just without CA
 *    verification. Connection strings without an `sslmode` (local/CI) are left
 *    untouched.
 */
export function normalizeDbUrl(raw: string | undefined | null): string {
  if (!raw) {
    return '';
  }
  try {
    const url = new URL(raw);
    url.searchParams.delete('channel_binding');
    const sslmode = url.searchParams.get('sslmode');
    if (sslmode && sslmode !== 'disable' && sslmode !== 'no-verify') {
      url.searchParams.set('sslmode', 'no-verify');
    }
    return url.toString();
  } catch {
    return raw;
  }
}
