import { VillageCard } from '@features/villages/ui';
import type { Village } from '@shared/api/supabase';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';
import cn from 'classnames';

import styles from './VillageList.module.scss';

interface VillageListProps extends DefaultComponentProps {
  villages: Village[];
  totalCountText: string;
  inViewRef: (node?: Element | null) => void;
}

export default function VillageList({ className, villages, totalCountText, inViewRef }: VillageListProps) {
  return (
    <List lines="none" className={cn(styles['village-list'], className)}>
      <ListHeader>{totalCountText}</ListHeader>
      {villages.map((village, index) => (
        <Item key={village.village_id} ref={inViewRef}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
