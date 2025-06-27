import { useFetchHomeVillageList } from '@entities/villages/hooks';
import { VillageCard } from '@features/villages/ui';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';
import cn from 'classnames';

import styles from './HomeList.module.scss';

interface HomeListProps extends DefaultComponentProps {}

export default function HomeList({ className }: HomeListProps) {
  const { data: villages = [] } = useFetchHomeVillageList();
  return (
    <List lines="none" className={cn(styles['home-list'], className)}>
      <ListHeader>{'추천 체험휴양마을'}</ListHeader>
      {villages.map((village, index) => (
        <Item key={village.village_id}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
