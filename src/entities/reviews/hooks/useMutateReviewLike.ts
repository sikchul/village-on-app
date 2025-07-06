import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReviewQueryKey } from '../constants/queryKey';
import { toggleReviewLike } from '../mutations';

export const useMutateReviewLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleReviewLike,
    onSettled: (_, __, { reviewId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: ReviewQueryKey.fetchReviewDetail({ id: Number(reviewId) })
      });
      queryClient.removeQueries({
        queryKey: ReviewQueryKey.fetchReviewList({})
      });
      queryClient.removeQueries({
        queryKey: ReviewQueryKey.fetchProfileReviewList(String(userId))
      });
    }
  });
};
