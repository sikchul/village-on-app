import { useFetchLikedVillageList } from '@entities/villages/hooks/useFetchLikedVillageList';
import { VillageCard } from '@features/villages/ui';
import type { PropsWithClassName } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';

import styles from './ProfileLike.module.scss';

interface ProfileLikeProps extends PropsWithClassName {}

export default function ProfileLike({}: ProfileLikeProps) {
  const { data: likedVillages = [] } = useFetchLikedVillageList();
  return (
    <List lines="none" className={styles['profile-like']}>
      <ListHeader>{'좋아요 누른 체험휴양마을'}</ListHeader>
      {likedVillages.map((village, index) => (
        <Item key={village.village_id}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
