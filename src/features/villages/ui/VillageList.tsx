import { VillageCard, VillageFilterBanner } from '@features/villages/ui';
import type { Village } from '@shared/api/supabase';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List } from '@shared/ui/list';
import cn from 'classnames';

import styles from './VillageList.module.scss';

interface VillageListProps extends DefaultComponentProps {
  villages: Village[];
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
  inViewRef: (node?: Element | null) => void;
}

export default function VillageList({
  className,
  villages,
  totalCount,
  filterArray,
  inViewRef
}: VillageListProps) {
  return (
    <List lines="none" className={cn(styles['village-list'], className)}>
      <Item>
        <VillageFilterBanner totalCount={totalCount} filterArray={filterArray} />
      </Item>
      {villages.map((village, index) => (
        <Item key={village.village_id} ref={inViewRef}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
    </List>
  );
}
