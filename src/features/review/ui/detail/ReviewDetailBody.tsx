import { IonRow, IonText, IonAvatar } from '@ionic/react';
import type { Database } from '@shared/api/supabase';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { formatDateToKorean } from '@shared/utils/date';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import styles from './ReviewDetailBody.module.scss';
import ReviewDetailFooter from './ReviewDetailFooter';

interface ReviewDetailBodyProps
  extends DefaultComponentProps,
    Pick<
      Database['public']['Views']['get_review_detail_view']['Row'],
      'comment' | 'review_images' | 'nickname' | 'avatar' | 'phone_number' | 'created_at'
    > {}

export default function ReviewDetailBody({
  comment,
  review_images,
  nickname,
  avatar,
  phone_number,
  created_at
}: ReviewDetailBodyProps) {
  return (
    <Grid className={styles['review-detail-body']}>
      <IonRow className={styles['review-detail-info-row']}>
        <Col size="12">
          {review_images && review_images.length > 0 && (
            <div className={styles['review-images-container']}>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  bulletClass: styles['swiper-pagination-bullet'],
                  bulletActiveClass: styles['swiper-pagination-bullet-active']
                }}
                loop={review_images.length > 1}
                className={styles['review-swiper']}
              >
                {review_images.map((image, index) => (
                  <SwiperSlide key={index} className={styles['review-slide']}>
                    <img
                      src={image}
                      alt={`리뷰 이미지 ${index + 1}`}
                      className={styles['review-image']}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </Col>
      </IonRow>
      <IonRow className={styles['review-detail-info-row']}>
        <Col size="12">
          <div className={styles['review-user-info']}>
            <div className={styles['review-user-avatar-nickname']}>
              <IonAvatar className={styles['review-user-avatar']}>
                <img src={avatar} alt="user avatar" />
              </IonAvatar>
              <IonText className={styles['review-user-nickname']}>{nickname}</IonText>
            </div>
          </div>
          <div className={styles['review-content']}>
            <IonText className={styles['review-comment']}>{comment}</IonText>
          </div>
          <div className={styles['review-created-at-container']}>
            <IonText className={styles['review-created-at']}>
              {formatDateToKorean(created_at)}
            </IonText>
          </div>
        </Col>
      </IonRow>
      <ReviewDetailFooter phone_number={phone_number} />
    </Grid>
  );
}
