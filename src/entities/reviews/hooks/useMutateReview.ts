import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ReviewQueryKey } from '../constants/queryKey';
import { updateReview } from '../mutations';

export const useMutateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReview,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ReviewQueryKey.fetchReviewList({})
      });
    }
  });
};
