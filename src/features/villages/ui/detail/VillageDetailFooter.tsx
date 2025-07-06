import { useAuth } from '@app/provider/useAuth';
import ReviewAddModal from '@features/review/ui/ReviewAddModal';
import { IonButton, IonIcon, IonRow } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { Database } from '@shared/database/database.types';
import { useModal } from '@shared/hooks';
import type { PropsWithClassName } from '@shared/types/props';
import { Col } from '@shared/ui/grid';
import { imagesOutline } from 'ionicons/icons';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './VillageDetailFooter.module.scss';

interface VillageDetailFooterProps
  extends PropsWithClassName,
    Pick<
      Database['public']['Views']['get_village_detail_view']['Row'],
      'phone_number' | 'village_id'
    > {}

export default function VillageDetailFooter({
  village_id,
  phone_number
}: VillageDetailFooterProps) {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();
  const { present: presentReviewAddModal, dismiss: dismissReviewAddModal } = useModal(
    ReviewAddModal,
    {
      villageId: village_id || 0,
      user,
      onDismiss: () => {
        dismissReviewAddModal();
        history.push(ROUTE_PATH.REVIEWS);
      }
    }
  );

  const handleImages = useCallback(() => {
    if (!isAuthenticated || !user) {
      history.push(ROUTE_PATH.LOGIN);
      return;
    }

    presentReviewAddModal({
      breakpoints: [0, 0.7],
      initialBreakpoint: 0.7,
      backdropBreakpoint: 0
    });
  }, [presentReviewAddModal, user, isAuthenticated, history]);

  const handleCall = useCallback(async () => {
    if (!phone_number) {
      return;
    }

    try {
      const cleanPhoneNumber = phone_number.replace(/[\s-()]/g, '');
      const phoneUrl = `tel:${cleanPhoneNumber}`;

      window.open(phoneUrl, '_self');
    } catch {
      throw new Error('Failed to open phone app');
    }
  }, [phone_number]);

  return (
    <IonRow className={styles['village-detail-footer']}>
      <Col className={styles['village-detail-footer-col']}>
        <IonButton
          className={styles['village-detail-footer-call-button']}
          shape="round"
          onClick={handleCall}
          disabled={!phone_number}
        >
          전화문의
        </IonButton>
        <IonButton
          className={styles['village-detail-footer-images-button']}
          shape="round"
          onClick={handleImages}
        >
          <IonIcon slot="icon-only" icon={imagesOutline} />
        </IonButton>
      </Col>
    </IonRow>
  );
}
