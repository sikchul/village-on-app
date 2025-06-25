import { IonText } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import cn from 'classnames';

import styles from './HomeExtraContent.module.scss';

interface HomeExtraContentProps extends PropsWithClassName {}

export default function HomeExtraContent({ className }: HomeExtraContentProps) {
  return (
    <IonText className={cn(styles['home-extra-content-title'], className)}>
      <h1>Village ON</h1>
    </IonText>
  );
}
