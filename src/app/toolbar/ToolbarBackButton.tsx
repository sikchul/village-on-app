import { BackButton } from '@shared/ui/toolbar';
import { IonButtons } from '@ionic/react';
import styles from './ToolbarBackButton.module.scss';
import { type ComponentProps } from 'react';
import cn from 'classnames';

interface ToolbarBackButtonProps extends Pick<ComponentProps<typeof BackButton>, 'icon' | 'defaultHref' | 'className'> {}

export default function ToolbarBackButton({ className, icon, defaultHref, ...props }: ToolbarBackButtonProps) {
  return (
    <IonButtons className={cn(styles['toolbar-back-button'], className)} slot="start">
      <BackButton icon={icon} defaultHref={defaultHref} {...props} />
    </IonButtons>
  );
}