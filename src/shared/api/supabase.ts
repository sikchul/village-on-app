import { ENV } from '@shared/constants/config';
import type { Database as SupabaseDatabase, Tables } from '@shared/database/database.types';
import { createClient } from '@supabase/supabase-js';
import type { SetNonNullable, MergeDeep } from 'type-fest';

export type Village = Tables<'villages'>;

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        get_home_village_list: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['get_home_village_list']['Row']>;
        };
      };
    };
  }
>;

export const supabase = createClient<Database>(ENV.supabase.url, ENV.supabase.anonKey);
