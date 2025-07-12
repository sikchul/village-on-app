import type { ReviewListItem } from '@entities/reviews/types';
import { ReviewFilterBanner } from '@features/review/ui';
import { type DefaultComponentProps } from '@shared/types/props';
import { Item } from '@shared/ui/item';
import { List } from '@shared/ui/list';
import cn from 'classnames';

import { ReviewCard } from '.';
import styles from './ReviewList.module.scss';

interface ReviewListProps extends DefaultComponentProps {
  reviews: ReviewListItem[];
  totalCount: number;
  filterArray: { label: string; value: string; onRemove: () => void }[];
  inViewRef: (node?: Element | null) => void;
}

export default function VillageList({
  className,
  reviews,
  totalCount,
  filterArray,
  inViewRef
}: ReviewListProps) {
  return (
    <List lines="none" className={cn(styles['review-list'], className)}>
      <Item>
        <ReviewFilterBanner totalCount={totalCount} filterArray={filterArray} />
      </Item>
      {reviews.map((review) => (
        <Item key={review.review_id} ref={inViewRef}>
          <ReviewCard review={review} />
        </Item>
      ))}
    </List>
  );
}
