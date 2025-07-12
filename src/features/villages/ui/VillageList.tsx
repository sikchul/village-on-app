import { ListLoading } from '@app/loading';
import { useVillagesExceptionHandler } from '@features/villages/hooks';
import { VillageCard, VillageFilterBanner } from '@features/villages/ui';
import type { Village } from '@shared/api/supabase';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List } from '@shared/ui/list';
import cn from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './VillageList.module.scss';

interface VillageListProps extends DefaultComponentProps {
  villages: Village[];
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
  inViewRef: (node?: Element | null) => void;
  isLoading?: boolean;
  isError?: boolean;
  isFetchingNext?: boolean;
}

export default function VillageList({
  className,
  villages,
  totalCount,
  filterArray,
  inViewRef,
  isLoading,
  isError,
  isFetchingNext
}: VillageListProps) {
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const handleResetFilter = async () => {
    replace({ pathname, search: '' });
  };
  const ExceptionComponent = useVillagesExceptionHandler({
    isLoading,
    isError,
    isEmpty: totalCount === 0,
    action: handleResetFilter
  });
  return (
    <List lines="none" className={cn(styles['village-list'], className)}>
      <Item>
        <VillageFilterBanner totalCount={totalCount} filterArray={filterArray} />
      </Item>
      {ExceptionComponent}
      {villages.map((village, index) => (
        <Item key={village.village_id} ref={inViewRef}>
          <VillageCard village={village} index={index} />
        </Item>
      ))}
      {isFetchingNext && (
        <Item>
          <ListLoading />
        </Item>
      )}
    </List>
  );
}
