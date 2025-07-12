import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton, ToolbarButton } from '@app/toolbar';
import { useFetchReviewDetail } from '@entities/reviews/hooks';
import { ReviewDetailBody, ReviewDetailHeader } from '@features/review/ui/detail';
import { IonPage, IonRow } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import { Skeleton } from '@shared/ui/skeleton';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline, locationOutline } from 'ionicons/icons';
import { useCallback } from 'react';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './ReviewDetail.module.scss';

interface ReviewDetailProps extends RouteComponentProps<{ id: string }> {}

export default function ReviewDetail({ match }: ReviewDetailProps) {
  const { id } = match.params;
  const { data: reviewDetail, isLoading: isLoadingReviewDetail } = useFetchReviewDetail({
    id: Number(id)
  });
  const {
    review_id,
    exprn_village_nm = '',
    rdnmadr,
    likes = 0,
    latitude,
    longitude,
    is_liked,
    review_images,
    comment,
    nickname,
    avatar,
    phone_number,
    created_at
  } = reviewDetail || {};

  const handleMap = useCallback(() => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      const userAgent = navigator.userAgent.toLowerCase();
      let mapUrl = '';

      if (/iphone|ipad|ipod/.test(userAgent)) {
        mapUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
      } else if (/android/.test(userAgent)) {
        mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
          exprn_village_nm
        )}?c=${longitude},${latitude},15,0,0,0,dh`;
      } else {
        mapUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
      }

      window.open(mapUrl, '_blank');
    } catch {
      try {
        const fallbackUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
        window.open(fallbackUrl, '_blank');
      } catch {
        throw new Error('Failed to open map app');
      }
    }
  }, [latitude, longitude, exprn_village_nm]);

  return (
    <IonPage className={styles['review-detail-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          <ToolbarButton
            icon={locationOutline}
            onClick={handleMap}
            disabled={!latitude || !longitude}
          />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout defaultOffset={120} isFixed={true}>
          <Grid className={styles['review-detail-layout']}>
            <IonRow className={styles['review-detail-row']}>
              <Col>
                {isLoadingReviewDetail ? (
                  <Skeleton className={styles['skeleton-header']} />
                ) : (
                  <ReviewDetailHeader
                    review_id={review_id || 0}
                    exprn_village_nm={exprn_village_nm || '-'}
                    rdnmadr={rdnmadr || '-'}
                    likes={likes}
                    is_liked={is_liked || false}
                  />
                )}
              </Col>
            </IonRow>
            <IonRow className={styles['review-detail-row']}>
              <Col>
                {isLoadingReviewDetail ? (
                  <Skeleton className={styles['skeleton-body']} />
                ) : (
                  <ReviewDetailBody
                    comment={comment || '-'}
                    review_images={review_images || []}
                    nickname={nickname || '-'}
                    avatar={avatar || '-'}
                    phone_number={phone_number || '-'}
                    created_at={created_at || ''}
                  />
                )}
              </Col>
            </IonRow>
          </Grid>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
