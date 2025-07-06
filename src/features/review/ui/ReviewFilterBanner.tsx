import { IonCardTitle, IonIcon, IonLabel } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import { Card, CardContent, CardHeader } from '@shared/ui/card';
import { Chip } from '@shared/ui/chip';
import cn from 'classnames';
import { closeOutline } from 'ionicons/icons';

import styles from './ReviewFilterBanner.module.scss';

interface ReviewFilterBannerProps extends PropsWithClassName {
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
}

export default function ReviewFilterBanner({
  className,
  totalCount,
  filterArray
}: ReviewFilterBannerProps) {
  return (
    <Card className={cn(styles['review-filter-banner'], className)}>
      <CardHeader>
        <IonCardTitle className={styles['filter-banner-title']}>
          {`리뷰 (${totalCount})`}
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
