import { IonHeader } from '@ionic/react';
import cn from 'classnames';
import type { ComponentProps } from 'react';

interface HeaderProps extends ComponentProps<typeof IonHeader> {}

export default function Header({ children, className, ...props }: HeaderProps) {
  return (
    <IonHeader className={cn('ion-no-border', className)} {...props}>
      {children}
    </IonHeader>
  );
}
