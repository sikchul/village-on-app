import { profiles } from '@entities/profiles/schema';
import { villages } from '@entities/villages/schema';
import { pgTable, bigint, text, timestamp, integer, uuid, primaryKey } from 'drizzle-orm/pg-core';

export const reviews = pgTable('reviews', {
  review_id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
  profile_id: uuid().references(() => profiles.profile_id, {
    onDelete: 'cascade'
  }),
  village_id: bigint({ mode: 'number' }).references(() => villages.village_id, {
    onDelete: 'cascade'
  }),
  review_images: text().array().default([]),
  comment: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  likes: integer().notNull().default(0)
});

export const reviews_likes = pgTable(
  'reviews_likes',
  {
    review_id: bigint({ mode: 'number' }).references(() => reviews.review_id, {
      onDelete: 'cascade'
    }),
    profile_id: uuid().references(() => profiles.profile_id, { onDelete: 'cascade' })
  },
  (table) => [primaryKey({ columns: [table.review_id, table.profile_id] })]
);
