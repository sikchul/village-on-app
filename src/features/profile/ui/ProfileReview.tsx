import { useFetchLikedReviewList } from '@entities/reviews/hooks/useFetchLikedReviewList';
import { ReviewCard } from '@features/review/ui';
import type { PropsWithClassName } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List, ListHeader } from '@shared/ui/list';
import { useMemo } from 'react';

import styles from './ProfileReview.module.scss';
import { useProfileExceptionHandler } from '../hooks';

interface ProfileReviewProps extends PropsWithClassName {}

export default function ProfileReview({}: ProfileReviewProps) {
  const {
    data: reviews,
    refetch: refetchReviewList,
    isLoading: isLoadingReviewList,
    isError: isErrorReviewList
  } = useFetchLikedReviewList();
  const reviewItems = useMemo(() => reviews?.items ?? [], [reviews]);
  const ExceptionComponent = useProfileExceptionHandler({
    isLoading: isLoadingReviewList,
    isError: isErrorReviewList,
    isEmpty: reviewItems.length === 0,
    title: (
      <>
        <p>
          <strong>작성한 체험리뷰가 없습니다.</strong>
        </p>
        <p>체험리뷰를 작성해보세요.</p>
      </>
    ),
    action: async () => {
      if (isErrorReviewList) {
        await refetchReviewList();
      }
    }
  });
  return (
    <List lines="none" className={styles['profile-review']}>
      <ListHeader>{'작성한 체험리뷰'}</ListHeader>
      {ExceptionComponent}
      {reviewItems.map((review) => (
        <Item key={review.review_id}>
          <ReviewCard review={review} />
        </Item>
      ))}
    </List>
  );
}
