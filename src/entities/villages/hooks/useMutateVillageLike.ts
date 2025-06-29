import { useMutation, useQueryClient } from '@tanstack/react-query';

import { VillageQueryKey } from '../constants/queryKey';
import { toggleVillageLike } from '../mutation';

export const useMutateVillageLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleVillageLike,
    onSettled: (_, __, { villageId }) => {
      queryClient.invalidateQueries({
        queryKey: VillageQueryKey.fetchVillageDetail({ id: Number(villageId) })
      });
      queryClient.removeQueries({
        queryKey: VillageQueryKey.fetchVillageList({})
      });
      queryClient.removeQueries({
        queryKey: VillageQueryKey.fetchHomeVillageList
      });
    }
  });
};
