import type { PropsWithClassName } from '@shared/types/props';

import styles from './ProfileLike.module.scss';

interface ProfileLikeProps extends PropsWithClassName {}

export default function ProfileLike({}: ProfileLikeProps) {
  return <div className={styles['profile-like']}>ProfileLike</div>;
}
