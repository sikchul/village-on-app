import { IonButton, IonIcon } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import cn from 'classnames';

import styles from './ToolbarButton.module.scss';

interface ToolbarButtonProps extends PropsWithClassName {
  icon: string;
  onClick?: () => void;
}

export default function ToolbarButton({ className, icon, onClick }: ToolbarButtonProps) {
  return (
    <IonButton
      shape="round"
      className={cn(styles['toolbar-button'], className)}
      slot="end"
      onClick={onClick}
    >
      <IonIcon
        slot="icon-only"
        icon={icon}
        aria-hidden="true"
        className={styles['toolbar-button-icon']}
      ></IonIcon>
    </IonButton>
  );
}
