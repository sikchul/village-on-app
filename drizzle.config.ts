import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./src/entities/profiles/schema.ts', './src/entities/villages/schema.ts'],
  out: './src/shared/database/migrations',
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL!
  }
});
