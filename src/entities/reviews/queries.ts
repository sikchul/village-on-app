import { supabase } from '@shared/api/supabase';
import { LIST_ITEM_PER_PAGE } from '@shared/constants/app';

import type { ReviewDetailRequestParams, ReviewListRequestParams, ReviewListItem } from './types';

export const getReviewList = async (params: ReviewListRequestParams) => {
  const { page, profile_id, exprn_village_nm } = params;
  const from = (page ?? 0) * LIST_ITEM_PER_PAGE;
  const to = from + LIST_ITEM_PER_PAGE - 1;

  let query = supabase.from('get_review_list_view').select('*', { count: 'exact' });

  if (profile_id) {
    query = query.eq('profile_id', profile_id);
  }

  if (exprn_village_nm) {
    query = query.ilike('exprn_village_nm', `%${exprn_village_nm}%`);
  }

  if (page) {
    query = query.order('created_at', { ascending: false }).range(from, to);
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return {
    items: (data as ReviewListItem[]) || [],
    totalCount: count ?? 0
  };
};

export const getReviewDetail = async (params: ReviewDetailRequestParams) => {
  const { id } = params;
  const { data, error } = await supabase
    .from('get_review_detail_view')
    .select('*')
    .eq('review_id', id);
  if (error) throw new Error(error.message);
  return data?.[0] || null;
};
