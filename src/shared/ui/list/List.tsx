import { IonList } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './List.module.scss';

interface ListProps extends ComponentProps<typeof IonList> {}

export default function List({ children, className, ...props }: ListProps) {
  return (
    <IonList className={cn(styles['list'], className)} {...props}>
      {children}
    </IonList>
  );
}
