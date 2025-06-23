import { IonTabBar } from '@ionic/react';
import type { ComponentProps } from 'react';

import styles from './TabBar.module.scss';

interface TabBarProps extends ComponentProps<typeof IonTabBar> {}

export default function TabBar({ children, ...props }: TabBarProps) {
  return (
    <IonTabBar className={styles['tab-bar']} {...props}>
      {children}
    </IonTabBar>
  );
}
