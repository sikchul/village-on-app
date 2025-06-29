import { useAuth } from '@app/provider/useAuth';
import { useQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getLikedVillages } from '../queries';

export const useFetchLikedVillageList = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: VillageQueryKey.fetchLikedVillageList(String(user?.profile_id)),
    queryFn: () => getLikedVillages({ profileId: String(user?.profile_id) })
  });
};
