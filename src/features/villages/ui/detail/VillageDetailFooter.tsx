import { IonButton, IonIcon, IonRow } from '@ionic/react';
import type { PropsWithClassName } from '@shared/types/props';
import { Col } from '@shared/ui/grid';
import { imagesOutline } from 'ionicons/icons';
import { useCallback } from 'react';

import styles from './VillageDetailFooter.module.scss';

interface VillageDetailFooterProps extends PropsWithClassName {}

export default function VillageDetailFooter({}: VillageDetailFooterProps) {
  const handleImages = useCallback(() => {
    console.log('images');
  }, []);

  return (
    <IonRow className={styles['village-detail-footer']}>
      <Col className={styles['village-detail-footer-col']}>
        <IonButton className={styles['village-detail-footer-call-button']} shape="round">
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
