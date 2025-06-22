import { ENV } from '@shared/constants/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: [], // './src/entities/**/schema.ts'
  out: './src/shared/database/migrations',
  dbCredentials: {
    url: ENV.database.url
  }
});
