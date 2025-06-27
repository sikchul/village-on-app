import { IonButton, IonIcon } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import cn from 'classnames';
import { filterOutline } from 'ionicons/icons';

import styles from './ToolbarButton.module.scss';

interface ToolbarButtonProps extends PropsWithClassName {
  onClick?: () => void;
}

export default function ToolbarButton({ className, onClick }: ToolbarButtonProps) {
  return (
    <IonButton
      shape="round"
      className={cn(styles['toolbar-button'], className)}
      slot="end"
      onClick={onClick}
    >
      <IonIcon
        slot="icon-only"
        icon={filterOutline}
        aria-hidden="true"
        className={styles['toolbar-button-icon']}
      ></IonIcon>
    </IonButton>
  );
}
