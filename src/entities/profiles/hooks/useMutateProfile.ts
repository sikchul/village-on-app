import { useMutation } from '@tanstack/react-query';

import { updateProfile } from '../mutations';

export const useMutateProfile = () => {
  return useMutation({
    mutationFn: updateProfile
  });
};
