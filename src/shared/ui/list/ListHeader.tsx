import { IonListHeader } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './ListHeader.module.scss';

interface ListHeaderProps extends ComponentProps<typeof IonListHeader> {}

export default function ListHeader({ className, children, ...props }: ListHeaderProps) {
  return (
    <IonListHeader className={cn(styles['list-header'], className)} {...props}>
      {children}
    </IonListHeader>
  );
}