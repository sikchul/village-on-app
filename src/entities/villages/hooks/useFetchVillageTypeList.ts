import { useQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getVillageTypeList } from '../queries';

export const useFetchVillageTypeList = () => {
  return useQuery({
    queryKey: VillageQueryKey.fetchVillageTypeList,
    queryFn: getVillageTypeList
  });
};
