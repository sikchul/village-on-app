import { useAuth } from '@app/provider/useAuth';
import { useQuery } from '@tanstack/react-query';

import { ReviewQueryKey } from '../constants/queryKey';
import { getReviewList } from '../queries';

export const useFetchLikedReviewList = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ReviewQueryKey.fetchProfileReviewList(String(user?.profile_id)),
    queryFn: () => getReviewList({ profile_id: String(user?.profile_id) })
  });
};
