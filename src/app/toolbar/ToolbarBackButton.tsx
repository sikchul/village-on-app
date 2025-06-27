import { IonButtons } from '@ionic/react';
import { BackButton } from '@shared/ui/toolbar';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './ToolbarBackButton.module.scss';

interface ToolbarBackButtonProps
  extends Pick<ComponentProps<typeof BackButton>, 'icon' | 'defaultHref' | 'className'> {}

export default function ToolbarBackButton({
  className,
  icon,
  defaultHref,
  ...props
}: ToolbarBackButtonProps) {
  return (
    <IonButtons className={cn(styles['toolbar-back-button'], className)} slot="start">
      <BackButton icon={icon} defaultHref={defaultHref} {...props} />
    </IonButtons>
  );
}
