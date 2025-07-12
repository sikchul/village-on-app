import { IonSkeletonText } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import cn from 'classnames';

import styles from './Skeleton.module.scss';

interface SkeletonProps extends PropsWithClassName {}

export default function Skeleton({ className }: SkeletonProps) {
  return <IonSkeletonText className={cn(styles.skeleton, className)} animated />;
}
