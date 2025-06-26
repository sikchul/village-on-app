import { IonChip } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './Chip.module.scss';

interface ChipProps extends ComponentProps<typeof IonChip> {}

export default function Chip({ children, className, ...props }: ChipProps) {
  return (
    <IonChip className={cn(styles.chip, className)} {...props}>
      {children}
    </IonChip>
  );
}
