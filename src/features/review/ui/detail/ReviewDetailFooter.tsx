import { IonButton, IonRow } from '@ionic/react';
import type { Database } from '@shared/database/database.types';
import type { PropsWithClassName } from '@shared/types/props';
import { Col } from '@shared/ui/grid';
import { useCallback } from 'react';

import styles from './ReviewDetailFooter.module.scss';

interface ReviewDetailFooterProps
  extends PropsWithClassName,
    Pick<Database['public']['Views']['get_review_detail_view']['Row'], 'phone_number'> {}

export default function ReviewDetailFooter({ phone_number }: ReviewDetailFooterProps) {
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
    <IonRow className={styles['review-detail-footer']}>
      <Col className={styles['review-detail-footer-col']}>
        <IonButton
          className={styles['review-detail-footer-call-button']}
          shape="round"
          onClick={handleCall}
          disabled={!phone_number}
        >
          전화문의
        </IonButton>
      </Col>
    </IonRow>
  );
}
