import { pgSchema, uuid } from 'drizzle-orm/pg-core';

export const users = pgSchema('auth').table('users', {
  id: uuid().primaryKey()
});
