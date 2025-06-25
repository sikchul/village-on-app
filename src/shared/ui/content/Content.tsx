import { IonContent } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

import styles from './Content.module.scss';

interface ContentProps extends ComponentProps<typeof IonContent> {}

export default function Content({ children, className, ...props }: ContentProps) {
  return (
    <IonContent className={cn(styles['content'], className)} {...props}>
      {children}
    </IonContent>
  );
}
