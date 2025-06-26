import { IonCardHeader } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './CardHeader.module.scss';

interface CardHeaderProps extends ComponentProps<typeof IonCardHeader> {}

export default function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <IonCardHeader className={cn(styles['card-header'], className)} {...props}>
      {children}
    </IonCardHeader>
  );
}
