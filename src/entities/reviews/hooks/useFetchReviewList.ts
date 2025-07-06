import { getReviewList } from '@entities/reviews/queries';
import type { ReviewListRequestParams } from '@entities/reviews/types';
import { LIST_ITEM_PER_PAGE } from '@shared/constants/app';
import { useInfiniteQuery } from '@tanstack/react-query';

import { ReviewQueryKey } from '../constants/queryKey';

interface UseFetchReviewListProps extends Omit<ReviewListRequestParams, 'page'> {}

export const useFetchReviewList = (params: UseFetchReviewListProps) => {
  return useInfiniteQuery({
    queryKey: ReviewQueryKey.fetchReviewList(params),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getReviewList({ ...params, page: pageParam });
      return response || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;

      return lastPage?.items.length === 0 || lastPage?.items.length < LIST_ITEM_PER_PAGE
        ? undefined
        : nextPage;
    },
    initialPageParam: 0,
    gcTime: 0
  });
};
