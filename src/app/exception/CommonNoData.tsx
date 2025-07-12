import { IonIcon, IonRow, IonText } from '@ionic/react';
import { Col, Grid } from '@shared/ui/grid';
import { imagesOutline } from 'ionicons/icons';
import type { ReactNode } from 'react';

import styles from './CommonNoData.module.scss';

interface CommonNoDataProps {
  title?: ReactNode;
}

export default function CommonNoData({ title }: CommonNoDataProps) {
  return (
    <Grid className={styles['common-no-data']}>
      <IonRow className={styles['common-no-data-row']}>
        <Col size="12">
          <IonIcon icon={imagesOutline} color="medium" size="large" />
        </Col>
        <Col size="12">
          <IonText>
            {title ? (
              title
            ) : (
              <>
                <p>
                  <strong>데이터가 없습니다.</strong>
                </p>
                <p>데이터를 추가해주세요.</p>
              </>
            )}
          </IonText>
        </Col>
      </IonRow>
    </Grid>
  );
}
