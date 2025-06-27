import { IonBackButton } from '@ionic/react';
import { type ComponentProps, forwardRef } from 'react';
import cn from 'classnames';

import styles from './BackButton.module.scss';

type BackButtonProps = Omit<ComponentProps<typeof IonBackButton>, 'ref'>;

export default forwardRef<HTMLIonBackButtonElement, BackButtonProps>(function BackButton({ className, ...props }, ref) {
  return <IonBackButton ref={ref as any} className={cn(styles['back-button'], className)} {...props} />;
});