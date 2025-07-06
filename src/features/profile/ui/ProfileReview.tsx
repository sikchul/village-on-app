import { useFetchLikedReviewList } from '@entities/reviews/hooks/useFetchLikedReviewList';
import { ReviewCard } from '@features/review/ui';
import type { PropsWithClassName } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';
import { useMemo } from 'react';

import styles from './ProfileReview.module.scss';

interface ProfileReviewProps extends PropsWithClassName {}

export default function ProfileReview({}: ProfileReviewProps) {
  const { data: reviews } = useFetchLikedReviewList();
  const reviewItems = useMemo(() => reviews?.items ?? [], [reviews]);
  return (
    <List lines="none" className={styles['profile-review']}>
      <ListHeader>{'작성한 리뷰'}</ListHeader>
      {reviewItems.map((review, index) => (
        <Item key={review.review_id}>
          <ReviewCard review={review} index={index} />
        </Item>
      ))}
    </List>
  );
}
