import { useAuth } from '@app/provider/useAuth';
import { useMutateVillageLike } from '@entities/villages/hooks';
import { IonIcon, IonRow, IonText } from '@ionic/react';
import type { Database } from '@shared/api/supabase';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { heart, heartOutline, locationOutline } from 'ionicons/icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './VillageDetailHeader.module.scss';

interface VillageDetailHeaderProps
  extends DefaultComponentProps,
    Pick<
      Database['public']['Views']['get_village_detail_view']['Row'],
      'village_id' | 'exprn_village_nm' | 'rdnmadr' | 'likes' | 'is_liked'
    > {}

export default function VillageDetailHeader({
  village_id,
  exprn_village_nm,
  rdnmadr,
  likes,
  is_liked
}: VillageDetailHeaderProps) {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();
  const [likesCount, setLikesCount] = useState(Number(likes) || 0);
  const [isLiked, setIsLiked] = useState(is_liked);
  const { mutate: likeVillage, isPending: isLikePending } = useMutateVillageLike();

  const heartIcon = useMemo(() => (isLiked ? heart : heartOutline), [isLiked]);

  const handleLike = useCallback(() => {
    if (isLikePending) return;

    if (isAuthenticated) {
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
      likeVillage({ villageId: village_id, userId: String(user?.profile_id) });
    } else {
      history.replace(ROUTE_PATH.LOGIN);
    }
  }, [
    isAuthenticated,
    isLikePending,
    isLiked,
    likesCount,
    likeVillage,
    village_id,
    user?.profile_id,
    history
  ]);

  useEffect(() => {
    setLikesCount(Number(likes) || 0);
    setIsLiked(is_liked);
  }, [likes, is_liked]);

  return (
    <Grid className={styles['village-detail-header']}>
      <IonRow className={styles['village-detail-header-left-row']}>
        <Col size="12" className={styles['village-detail-header-title-col']}>
          <IonText className={styles['village-detail-header-title']}>{exprn_village_nm}</IonText>
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
          <IonText className={styles['village-detail-header-description']}>
            <IonIcon icon={locationOutline} />
            {rdnmadr}
          </IonText>
        </Col>
      </IonRow>
    </Grid>
  );
}
