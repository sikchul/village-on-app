import { IonGrid } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './Grid.module.scss';

interface GridProps extends ComponentProps<typeof IonGrid> {}

export default function Grid({ children, className, ref, ...props }: GridProps) {
  return (
    <IonGrid ref={ref} className={cn(styles['grid'], className)} {...props}>
      {children}
    </IonGrid>
  );
}
