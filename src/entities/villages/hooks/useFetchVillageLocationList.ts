import { useQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getVillageLocationList } from '../queries';

export const useFetchVillageLocationList = () => {
  return useQuery({
    queryKey: VillageQueryKey.fetchVillageLocationList,
    queryFn: getVillageLocationList
  });
};
