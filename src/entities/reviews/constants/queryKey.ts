import type { ReviewListRequestParams } from '@entities/reviews/types';

export const ReviewQueryKey = {
  fetchReviewList: (params: Omit<ReviewListRequestParams, 'page'>) =>
    ['fetchReviewList', params.profile_id, params.exprn_village_nm] as const
};
