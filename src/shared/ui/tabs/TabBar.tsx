import { IonTabBar } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './TabBar.module.scss';

interface TabBarProps extends ComponentProps<typeof IonTabBar> {}

export default function TabBar({ children, className, ...props }: TabBarProps) {
  return (
    <IonTabBar className={cn(styles['tab-bar'], className)} {...props}>
      {children}
    </IonTabBar>
  );
}
