import type { VillageDetailRequestParams, VillageListRequestParams } from '../types';

export const VillageQueryKey = {
  fetchHomeVillageList: ['fetchHomeVillageList'] as const,
  fetchVillageTypeList: ['fetchVillageTypeList'] as const,
  fetchVillageLocationList: ['fetchVillageLocationList'] as const,
  fetchVillageList: (params: Omit<VillageListRequestParams, 'page'>) =>
    ['fetchVillageList', params.location, params.type] as const,
  fetchVillageDetail: (params: VillageDetailRequestParams) =>
    ['fetchVillageDetail', params.id] as const,
  fetchLikedVillageList: (profileId: string) => ['fetchLikedVillageList', profileId] as const
};
