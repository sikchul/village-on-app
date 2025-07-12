import { useFetchLikedVillageList } from '@entities/villages/hooks/useFetchLikedVillageList';
import { VillageCard } from '@features/villages/ui';
import type { PropsWithClassName } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';

import styles from './ProfileLike.module.scss';
import { useProfileExceptionHandler } from '../hooks';

interface ProfileLikeProps extends PropsWithClassName {}

export default function ProfileLike({}: ProfileLikeProps) {
  const {
    data: likedVillages = [],
    isLoading: isLoadingLikeList,
    isError: isErrorLikeList,
    refetch: refetchLikeList
  } = useFetchLikedVillageList();
  const ExceptionComponent = useProfileExceptionHandler({
    isLoading: isLoadingLikeList,
    isError: isErrorLikeList,
    isEmpty: likedVillages.length === 0,
    title: (
      <>
        <p>
          <strong>좋아요 누른 체험휴양마을이 없습니다.</strong>
        </p>
        <p>좋아요를 눌러보세요.</p>
      </>
    ),
    action: async () => {
      if (isErrorLikeList) {
        await refetchLikeList();
      }
    }
  });
  return (
    <List lines="none" className={styles['profile-like']}>
      <ListHeader>{'좋아요 누른 체험휴양마을'}</ListHeader>
      {ExceptionComponent}
      {likedVillages.map((village, index) => (
        <Item key={village.village_id}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
