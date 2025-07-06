import { useQuery } from '@tanstack/react-query';

import { ReviewQueryKey } from '../constants/queryKey';
import { getReviewDetail } from '../queries';
import type { ReviewDetailRequestParams } from '../types';

export const useFetchReviewDetail = (params: ReviewDetailRequestParams) => {
  return useQuery({
    queryKey: ReviewQueryKey.fetchReviewDetail(params),
    queryFn: () => getReviewDetail(params)
  });
};
