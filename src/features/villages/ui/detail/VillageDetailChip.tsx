import { IonAvatar, IonLabel } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import { Chip } from '@shared/ui/chip';

import styles from './VillageDetailChip.module.scss';

interface VillageDetailChipProps extends PropsWithClassName {
  label: string;
  index: number;
}

export default function VillageDetailChip({ label, index }: VillageDetailChipProps) {
  return (
    <Chip className={styles['village-detail-chip']}>
      <IonAvatar>
        <img alt="Chip icon" src={`/chip-icon-${index % 3}.png`} />
      </IonAvatar>
      <IonLabel>{label}</IonLabel>
    </Chip>
  );
}
