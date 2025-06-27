import { IonBackButton } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps, forwardRef, type RefObject } from 'react';

import styles from './BackButton.module.scss';

type BackButtonProps = Omit<ComponentProps<typeof IonBackButton>, 'ref'>;

export default forwardRef<HTMLIonBackButtonElement, BackButtonProps>(function BackButton(
  { className, ...props },
  ref
) {
  return (
    <IonBackButton
      ref={
        ref as RefObject<IonBackButton | null> &
          ((instance: HTMLIonBackButtonElement | null) => void | (() => void))
      }
      className={cn(styles['back-button'], className)}
      {...props}
    />
  );
});
