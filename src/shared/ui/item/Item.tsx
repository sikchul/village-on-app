import { IonItem } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './Item.module.scss';

interface ItemProps extends ComponentProps<typeof IonItem> {}

export default function Item({ children, className, ...props }: ItemProps) {
  return (
    <IonItem className={cn(styles['item'], className)} {...props}>
      {children}
    </IonItem>
  );
}
