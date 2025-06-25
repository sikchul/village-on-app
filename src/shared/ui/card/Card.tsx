import { IonCard } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './Card.module.scss';

interface CardProps extends ComponentProps<typeof IonCard> {}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <IonCard className={cn(styles['card'], className)} {...props}>
      {children}
    </IonCard>
  );
}
