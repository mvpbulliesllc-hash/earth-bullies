import { defineConfig } from 'drizzle-kit';
import { dbSsl, normalizeDbUrl } from './src/utils/dbUrl';

export default defineConfig({
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Strip channel_binding + sslmode (see src/utils/dbUrl) and pass explicit
    // SSL so migrations connect to Neon the same way the app does.
    url: normalizeDbUrl(process.env.DATABASE_URL),
    ssl: dbSsl(process.env.DATABASE_URL),
  },
  verbose: true,
  strict: true,
});
