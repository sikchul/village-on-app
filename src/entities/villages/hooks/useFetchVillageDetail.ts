import { useQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getVillageDetail } from '../queries';
import type { VillageDetailRequestParams } from '../types';

export const useFetchVillageDetail = (params: VillageDetailRequestParams) => {
  return useQuery({
    queryKey: VillageQueryKey.fetchVillageDetail(params),
    queryFn: () => getVillageDetail(params)
  });
};
