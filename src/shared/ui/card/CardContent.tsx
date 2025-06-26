import { IonCardContent } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './CardContent.module.scss';

interface CardContentProps extends ComponentProps<typeof IonCardContent> {}

export default function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <IonCardContent className={cn(styles['card-content'], className)} {...props}>
      {children}
    </IonCardContent>
  );
}
