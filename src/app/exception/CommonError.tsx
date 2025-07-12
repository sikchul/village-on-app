import { IonButton, IonIcon, IonRow, IonText } from '@ionic/react';
import { Col, Grid } from '@shared/ui/grid';
import { alertCircleOutline } from 'ionicons/icons';

import styles from './CommonError.module.scss';

interface CommonErrorProps {
  action: () => Promise<void>;
}

export default function CommonError({ action }: CommonErrorProps) {
  return (
    <Grid className={styles['common-error']}>
      <IonRow className={styles['common-error-row']}>
        <Col size="12">
          <IonIcon icon={alertCircleOutline} color="danger" size="large" />
        </Col>
        <Col size="12">
          <IonText>
            <p>
              <strong>일시적인 오류가 발생했습니다.</strong>
            </p>
            <p>다시 요청해주세요.</p>
          </IonText>
        </Col>
        <Col size="12">
          <IonButton onClick={action} expand="block" className={styles['action-button']}>
            다시 요청
          </IonButton>
        </Col>
      </IonRow>
    </Grid>
  );
}
