import type { ReviewListItem } from '@entities/reviews/types';
import { IonAvatar, IonCardSubtitle, IonCardTitle, IonIcon, IonRow, IonText } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { type DefaultComponentProps } from '@shared/types/props';
import { Card, CardContent, CardHeader } from '@shared/ui/card';
import { Col, Grid } from '@shared/ui/grid';
import { formatDateToKorean } from '@shared/utils/date';
import cn from 'classnames';
import { calendarOutline, heartOutline } from 'ionicons/icons';
import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './ReviewCard.module.scss';

interface ReviewCardProps extends DefaultComponentProps {
  review: ReviewListItem;
  index?: number;
}

export default function ReviewCard({ className, review, index = 0 }: ReviewCardProps) {
  const history = useHistory();
  const {
    exprn_village_nm,
    comment,
    review_images,
    created_at,
    likes,
    review_id,
    avatar,
    nickname
  } = review;

  const backgroundImage = useMemo(() => {
    if (review_images?.[0]) {
      return review_images[0];
    }
    const imageIndex = index % 3;
    return `card-bg-${imageIndex}.png`;
  }, [index, review_images]);

  return (
    <Card
      className={cn(styles['review-card'], className)}
      onClick={() => {
        history.push(`${ROUTE_PATH.REVIEWS}/${review_id}`);
      }}
    >
      <img alt="card-background" src={backgroundImage} className={styles['review-bg-img']} />
      <CardHeader>
        <Grid className={styles['card-title-container']}>
          <IonRow className={styles['card-title-row']}>
            <Col>
              <IonCardTitle className={styles['card-title']}>{exprn_village_nm}</IonCardTitle>
            </Col>
            <IonText className={styles['likes-text']}>
              <IonIcon icon={heartOutline} className={styles['likes-icon']} />
              {likes}
            </IonText>
          </IonRow>
        </Grid>
        <IonCardSubtitle>
          <Grid>
            <IonRow className="ion-align-items-center">
              <Col size="0.8">
                <IonText className={styles['subtitle-text']}>
                  <IonIcon icon={calendarOutline}></IonIcon>
                </IonText>
              </Col>
              <Col>
                <IonText>{formatDateToKorean(created_at)}</IonText>
              </Col>
            </IonRow>
          </Grid>
        </IonCardSubtitle>
        <Grid className={styles['user-info-container']}>
          <IonRow className={styles['user-info-row']}>
            <Col>{/*  */}</Col>
            <Col size="auto">
              <div className={styles['user-info']}>
                <IonAvatar className={styles['user-avatar']}>
                  <img src={avatar} alt="user avatar" />
                </IonAvatar>
                <IonText className={styles['user-nickname']}>{nickname}</IonText>
              </div>
            </Col>
          </IonRow>
        </Grid>
      </CardHeader>
      <CardContent>
        <IonText className={styles['comment-text']}>{comment}</IonText>
      </CardContent>
    </Card>
  );
}
