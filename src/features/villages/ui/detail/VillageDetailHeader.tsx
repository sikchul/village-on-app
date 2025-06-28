import { IonIcon, IonRow, IonText } from '@ionic/react';
import type { Village } from '@shared/api/supabase';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { locationOutline } from 'ionicons/icons';

import styles from './VillageDetailHeader.module.scss';

interface VillageDetailHeaderProps
  extends DefaultComponentProps,
    Pick<Village, 'exprn_village_nm' | 'rdnmadr' | 'likes'> {}

export default function VillageDetailHeader({
  exprn_village_nm,
  rdnmadr,
  likes
}: VillageDetailHeaderProps) {
  return (
    <Grid className={styles['village-detail-header']}>
      <IonRow className={styles['village-detail-header-left-row']}>
        <Col size="12">
          <IonText className={styles['village-detail-header-title']}>{exprn_village_nm}</IonText>
        </Col>
        <Col size="12">
          <IonText className={styles['village-detail-header-description']}>
            <IonIcon icon={locationOutline} />
            {rdnmadr}
          </IonText>
        </Col>
      </IonRow>
      <IonRow>
        <IonText>{likes}</IonText>
      </IonRow>
    </Grid>
  );
}
