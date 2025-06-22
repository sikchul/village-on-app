import { ENV } from '@shared/constants/config';
import type { Tables } from '@shared/database/database.types';
import { createClient } from '@supabase/supabase-js';

export type Village = Tables<'villages'>;

export const supabase = createClient(ENV.supabase.url, ENV.supabase.anonKey);
