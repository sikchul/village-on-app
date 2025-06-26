import { LIST_ITEM_PER_PAGE } from '@shared/constants/app';
import { useInfiniteQuery } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { getVillageList } from '../queries';
import type { VillageListRequestParams } from '../types';

interface UseFetchVillageListProps extends Omit<VillageListRequestParams, 'page'> {}

export const useFetchVillageList = (params: UseFetchVillageListProps) => {
  return useInfiniteQuery({
    queryKey: VillageQueryKey.fetchVillageList(params),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getVillageList({ ...params, page: pageParam });
      return response || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;

      return lastPage?.items.length === 0 || lastPage?.items.length < LIST_ITEM_PER_PAGE
        ? undefined
        : nextPage;
    },
    initialPageParam: 0,
    gcTime: 0
  });
};
