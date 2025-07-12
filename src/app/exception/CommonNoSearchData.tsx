import { IonButton, IonIcon, IonRow, IonText } from '@ionic/react';
import { Col, Grid } from '@shared/ui/grid';
import { searchOutline } from 'ionicons/icons';

import styles from './CommonNoSearchData.module.scss';

interface CommonNoSearchDataProps {
  action: () => Promise<void>;
}

export default function CommonNoSearchData({ action }: CommonNoSearchDataProps) {
  return (
    <Grid className={styles['common-no-search-data']}>
      <IonRow className={styles['common-no-search-data-row']}>
        <Col size="12">
          <IonIcon icon={searchOutline} color="medium" size="large" />
        </Col>
        <Col size="12">
          <IonText>
            <p>
              <strong>검색 결과가 없습니다.</strong>
            </p>
            <p>필터를 초기화해주세요.</p>
          </IonText>
        </Col>
        <Col size="12">
          <IonButton onClick={action} expand="block" className={styles['action-button']}>
            필터 초기화
          </IonButton>
        </Col>
      </IonRow>
    </Grid>
  );
}
