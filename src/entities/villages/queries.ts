import { supabase } from '@shared/api/supabase';
import { LIST_ITEM_PER_PAGE } from '@shared/constants/app';

import type { VillageListRequestParams } from './types';

export const getHomeVillageList = async () => {
  const { data, error } = await supabase.from('get_home_village_list').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getVillageTypeList = async () => {
  const { data, error } = await supabase.from('get_village_type_list').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getVillageLocationList = async () => {
  const { data, error } = await supabase.from('get_village_location_list').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const getVillageList = async (params: VillageListRequestParams) => {
  const { type, location, page } = params;
  const from = page * LIST_ITEM_PER_PAGE;
  const to = from + LIST_ITEM_PER_PAGE - 1;

  let query = supabase.from('villages').select('*', { count: 'exact' });

  if (type) {
    query = query.ilike('exprn_se', `%${type}%`);
  }

  if (location) {
    query = query.eq('institution_nm', location);
  }

  query = query.order('exprn_village_nm', { ascending: true }).range(from, to);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return {
    items: data,
    totalCount: count ?? 0
  };
};
