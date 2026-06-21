import { defineConfig } from 'drizzle-kit';
import { normalizeDbUrl } from './src/utils/dbUrl';

export default defineConfig({
  out: './migrations',
  schema: './src/models/Schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    // Strip channel_binding (unsupported by node-postgres) from the Neon URL.
    url: normalizeDbUrl(process.env.DATABASE_URL),
  },
  verbose: true,
  strict: true,
});
