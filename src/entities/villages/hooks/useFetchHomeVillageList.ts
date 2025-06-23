import { useQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getHomeVillageList } from '../queries';

export const useFetchHomeVillageList = () => {
  return useQuery({
    queryKey: VillageQueryKey.fetchHomeVillageList,
    queryFn: getHomeVillageList
  });
};
