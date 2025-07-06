import { supabase } from '@shared/api/supabase';
import { LIST_ITEM_PER_PAGE } from '@shared/constants/app';

import type { ReviewDetailRequestParams, ReviewListRequestParams, ReviewListItem } from './types';

export const getReviewList = async (params: ReviewListRequestParams) => {
  const { page, profile_id, exprn_village_nm } = params;
  const from = page * LIST_ITEM_PER_PAGE;
  const to = from + LIST_ITEM_PER_PAGE - 1;

  let query = supabase.from('reviews').select(
    `
      review_id,
      profile_id,
      village_id,
      review_images,
      comment,
      created_at,
      likes,
      profiles!reviews_profile_id_profiles_profile_id_fk (
        avatar,
        nickname
      ),
      villages!reviews_village_id_villages_village_id_fk (
        exprn_village_nm
      )
    `,
    { count: 'exact' }
  );

  if (profile_id) {
    query = query.eq('profile_id', profile_id);
  }

  if (exprn_village_nm) {
    query = query.ilike('villages.exprn_village_nm', `%${exprn_village_nm}%`);
  }

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  // 중첩된 객체를 1depth로 평면화
  const flattenedData =
    data?.map((item) => ({
      ...item,
      avatar: item.profiles?.avatar,
      nickname: item.profiles?.nickname,
      exprn_village_nm: item.villages?.exprn_village_nm,
      profiles: undefined,
      villages: undefined
    })) || [];

  return {
    items: flattenedData as ReviewListItem[],
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
