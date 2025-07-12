import { IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import { Card, CardContent, CardHeader } from '@shared/ui/card';
import { Chip } from '@shared/ui/chip';
import cn from 'classnames';
import { closeOutline } from 'ionicons/icons';

import styles from './VillageFilterBanner.module.scss';

interface VillageFilterBannerProps extends PropsWithClassName {
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
}

export default function VillageFilterBanner({
  className,
  totalCount,
  filterArray
}: VillageFilterBannerProps) {
  return (
    <Card className={cn(styles['village-filter-banner'], className)}>
      <CardHeader>
        <IonCardTitle className={styles['filter-banner-title']}>
          <span>{'체험휴양마을'}</span>
          <Chip outline={false} color="tertiary">
            {`검색결과: ${totalCount}`}
          </Chip>
        </IonCardTitle>
      </CardHeader>
      <CardContent>
        {filterArray.map(({ label, value, onRemove }) => (
          <Chip key={value} onClick={onRemove} className={styles['filter-banner-chip']}>
            <IonLabel>{`${label}: ${value}`}</IonLabel>
            <IonIcon icon={closeOutline} className={styles['filter-banner-chip-icon']} />
          </Chip>
        ))}
      </CardContent>
    </Card>
  );
}
