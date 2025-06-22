import { ENV } from '@shared/constants/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(ENV.database.url, { prepare: false });

const db = drizzle(client, { logger: true });

export default db;
