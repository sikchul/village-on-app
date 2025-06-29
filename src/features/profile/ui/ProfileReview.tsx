import type { PropsWithClassName } from '@shared/types/props';

import styles from './ProfileReview.module.scss';

interface ProfileReviewProps extends PropsWithClassName {}

export default function ProfileReview({}: ProfileReviewProps) {
  return <div className={styles['profile-review']}>ProfileReview</div>;
}
