import { IonSpinner } from '@ionic/react';
import cn from 'classnames';
import { type ComponentProps } from 'react';

import styles from './Spinner.module.scss';

interface SpinnerProps extends ComponentProps<typeof IonSpinner> {}

export default function Spinner({ className, ...props }: SpinnerProps) {
  return <IonSpinner className={cn(styles['spinner'], className)} {...props} />;
}
