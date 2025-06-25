import { IonCol } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './Col.module.scss';

interface ColProps extends ComponentProps<typeof IonCol> {}

export default function Col({ children, className, ...props }: ColProps) {
  return (
    <IonCol className={cn(styles['col'], className)} {...props}>
      {children}
    </IonCol>
  );
}
