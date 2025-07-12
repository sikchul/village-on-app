import { ListLoading } from '@app/loading';
import type { ReviewListItem } from '@entities/reviews/types';
import { ReviewFilterBanner } from '@features/review/ui';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List } from '@shared/ui/list';
import cn from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';

import { ReviewCard } from '.';
import styles from './ReviewList.module.scss';
import { useReviewsExceptionHandler } from '../hooks';

interface ReviewListProps extends DefaultComponentProps {
  reviews: ReviewListItem[];
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
  inViewRef: (node?: Element | null) => void;
  isLoading?: boolean;
  isError?: boolean;
  isFetchingNext?: boolean;
}

export default function VillageList({
  className,
  reviews,
  totalCount,
  filterArray,
  inViewRef,
  isLoading,
  isError,
  isFetchingNext
}: ReviewListProps) {
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const handleResetFilter = async () => {
    replace({ pathname, search: '' });
  };
  const ExceptionComponent = useReviewsExceptionHandler({
    isLoading,
    isError,
    isEmpty: reviews.length === 0,
    action: handleResetFilter
  });

  return (
    <List lines="none" className={cn(styles['review-list'], className)}>
      <Item>
        <ReviewFilterBanner totalCount={totalCount} filterArray={filterArray} />
      </Item>
      {ExceptionComponent}
      {reviews.map((review) => (
        <Item key={review.review_id} ref={inViewRef}>
          <ReviewCard review={review} />
        </Item>
      ))}
      {isFetchingNext && (
        <Item>
          <ListLoading />
        </Item>
      )}
    </List>
  );
}
