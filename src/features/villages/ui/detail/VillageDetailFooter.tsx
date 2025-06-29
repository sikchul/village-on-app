import { IonButton, IonIcon, IonRow } from '@ionic/react';
import type { Database } from '@shared/database/database.types';
import type { PropsWithClassName } from '@shared/types/props';
import { Col } from '@shared/ui/grid';
import { imagesOutline } from 'ionicons/icons';
import { useCallback } from 'react';

import styles from './VillageDetailFooter.module.scss';

interface VillageDetailFooterProps
  extends PropsWithClassName,
    Pick<Database['public']['Views']['get_village_detail_view']['Row'], 'phone_number'> {}

export default function VillageDetailFooter({ phone_number }: VillageDetailFooterProps) {
  const handleImages = useCallback(() => {
    console.log('images');
  }, []);

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
