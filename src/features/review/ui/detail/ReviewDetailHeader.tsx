import { useAuth } from '@app/provider/useAuth';
import { useMutateReviewLike } from '@entities/reviews/hooks';
import { IonIcon, IonRow, IonText } from '@ionic/react';
import type { Database } from '@shared/api/supabase';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { heart, heartOutline, locationOutline } from 'ionicons/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './ReviewDetailHeader.module.scss';

interface ReviewDetailHeaderProps
  extends DefaultComponentProps,
    Pick<
      Database['public']['Views']['get_review_detail_view']['Row'],
      'review_id' | 'exprn_village_nm' | 'rdnmadr' | 'likes' | 'is_liked'
    > {}

export default function ReviewDetailHeader({
  review_id,
  exprn_village_nm,
  rdnmadr,
  likes,
  is_liked
}: ReviewDetailHeaderProps) {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();
  const [likesCount, setLikesCount] = useState(Number(likes) || 0);
  const [isLiked, setIsLiked] = useState(is_liked);
  const { mutate: likeReview, isPending: isLikePending } = useMutateReviewLike();

  const heartIcon = useMemo(() => (isLiked ? heart : heartOutline), [isLiked]);

  const handleLike = useCallback(() => {
    if (isLikePending) return;

    if (isAuthenticated) {
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
      likeReview({ reviewId: review_id, userId: String(user?.profile_id) });
    } else {
      history.replace(ROUTE_PATH.LOGIN);
    }
  }, [isAuthenticated, isLikePending, isLiked, likesCount, likeReview, review_id, history, user]);

  useEffect(() => {
    setLikesCount(Number(likes) || 0);
    setIsLiked(is_liked);
  }, [likes, is_liked]);

  return (
    <Grid className={styles['review-detail-header']}>
      <IonRow className={styles['review-detail-header-left-row']}>
        <Col size="12" className={styles['review-detail-header-title-col']}>
          <IonText className={styles['review-detail-header-title']}>{exprn_village_nm}</IonText>
          <IonText className={styles['likes-text']}>
            <IonIcon
              icon={heartIcon}
              className={`${styles['likes-icon']} ${isLiked ? styles['is-liked'] : ''}`}
              onClick={handleLike}
            />
            {likesCount}
          </IonText>
        </Col>
        <Col size="12">
          <IonText className={styles['review-detail-header-description']}>
            <IonIcon icon={locationOutline} />
            {rdnmadr}
          </IonText>
        </Col>
      </IonRow>
    </Grid>
  );
}
