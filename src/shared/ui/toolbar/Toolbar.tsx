import { IonToolbar } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './Toolbar.module.scss';

interface ToolbarProps extends ComponentProps<typeof IonToolbar> {}

export default function Toolbar({ children, className, ...props }: ToolbarProps) {
  return (
    <IonToolbar className={cn(styles['toolbar'], className)} {...props}>
      {children}
    </IonToolbar>
  );
}
