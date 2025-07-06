import { useMutation } from '@tanstack/react-query';

import { updateReview } from '../mutations';

export const useMutateReview = () => {
  return useMutation({
    mutationFn: updateReview
  });
};
