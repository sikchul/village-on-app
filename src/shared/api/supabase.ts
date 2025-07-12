import { ENV } from '@shared/constants/config';
import type { Database as SupabaseDatabase, Tables } from '@shared/database/database.types';
import { createClient } from '@supabase/supabase-js';
import type { SetNonNullable, MergeDeep } from 'type-fest';

export type Village = Tables<'villages'>;
export type Profile = Tables<'profiles'>;
export type Review = Tables<'reviews'>;

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        get_home_village_list: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['get_home_village_list']['Row']>;
        };
        get_village_type_list: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['get_village_type_list']['Row']>;
        };
        get_village_location_list: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['get_village_location_list']['Row']
          >;
        };
        get_village_detail_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['get_village_detail_view']['Row']
          >;
        };
        get_review_detail_view: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['get_review_detail_view']['Row']>;
        };
        get_review_list_view: {
          Row: SetNonNullable<SupabaseDatabase['public']['Views']['get_review_list_view']['Row']>;
        };
      };
    };
  }
>;

export const supabase = createClient<Database>(ENV.supabase.url, ENV.supabase.anonKey);
