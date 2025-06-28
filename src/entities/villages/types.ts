import type { Village } from '@shared/api/supabase';

export interface VillageListRequestParams {
  page: number;
  type?: string;
  location?: string;
}

export interface VillageDetailRequestParams {
  id: Village['village_id'];
}
