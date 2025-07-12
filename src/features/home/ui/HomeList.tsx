import { useFetchHomeVillageList } from '@entities/villages/hooks';
import { VillageCard } from '@features/villages/ui';
import { type DefaultComponentProps } from '@shared/types/props';
import { Chip } from '@shared/ui/chip';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';
import cn from 'classnames';

import styles from './HomeList.module.scss';

interface HomeListProps extends DefaultComponentProps {}

export default function HomeList({ className }: HomeListProps) {
  const { data: villages = [] } = useFetchHomeVillageList();
  return (
    <List lines="none" className={cn(styles['home-list'], className)}>
      <ListHeader>
        <span>추천 체험휴양마을</span>
        <Chip outline={true} color="danger">
          TOP5
        </Chip>
      </ListHeader>
      {villages.map((village, index) => (
        <Item key={village.village_id}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
