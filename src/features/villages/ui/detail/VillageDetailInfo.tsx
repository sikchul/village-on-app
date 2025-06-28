import { IonAvatar, IonLabel } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import { Col } from '@shared/ui/grid';
import { Item } from '@shared/ui/item';

import styles from './VillageDetailInfo.module.scss';

interface VillageDetailInfoProps extends PropsWithClassName {
  label: string;
  value: string;
  iconPath: string;
}

export default function VillageDetailInfo({ label, value, iconPath }: VillageDetailInfoProps) {
  return (
    <Item lines="none" className={styles['village-detail-info']}>
      <IonAvatar slot="start">
        <img alt={label} src={iconPath} />
      </IonAvatar>
      <Col>
        <IonLabel className={styles['village-detail-info-label']}>{label}</IonLabel>
        <IonLabel className={styles['village-detail-info-value']}>{value}</IonLabel>
      </Col>
    </Item>
  );
}
