/**
 * Normalize a Postgres connection string for node-postgres (`pg`).
 *
 * Neon's pooled connection strings include `channel_binding=require`, but `pg`
 * does not implement SCRAM channel binding and throws when it sees that option.
 * We strip it here (TLS is still enforced via `sslmode=require`) so the same
 * URL works for migrations, seeding and runtime queries.
 */
export function normalizeDbUrl(raw: string | undefined | null): string {
  if (!raw) {
    return '';
  }
  try {
    const url = new URL(raw);
    url.searchParams.delete('channel_binding');
    return url.toString();
  } catch {
    return raw;
  }
}
