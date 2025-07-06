import { IonButton, IonInput, IonRow } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { useState } from 'react';

import styles from './ReviewFilterModal.module.scss';

export type FilterParams = {
  exprn_village_nm: string;
};

export interface ReviewFilterModalProps {
  exprn_village_nm: string;
  onDismiss: (params: FilterParams) => void;
}

export default function ReviewFilterModal({ exprn_village_nm, onDismiss }: ReviewFilterModalProps) {
  const [selectedExprnVillageNm, setSelectedExprnVillageNm] = useState<string>(
    exprn_village_nm || ''
  );

  const handleApply = () => {
    onDismiss({
      exprn_village_nm: selectedExprnVillageNm || ''
    });
  };

  return (
    <>
      <Content className={cn(styles['review-filter-modal'], 'ion-padding')}>
        <Grid>
          <IonRow className="ion-margin-bottom">
            <Col>
              <IonInput
                className={styles['input-box']}
                label="체험휴양마을명"
                labelPlacement="stacked"
                placeholder="체험휴양마을명을 입력하세요"
                value={selectedExprnVillageNm}
                onIonInput={(e) => setSelectedExprnVillageNm(e.detail.value || '')}
                maxlength={100}
              />
            </Col>
          </IonRow>
          <IonRow>
            <Col>
              <IonButton expand="block" className={styles['confirm-button']} onClick={handleApply}>
                적용하기
              </IonButton>
            </Col>
          </IonRow>
        </Grid>
      </Content>
    </>
  );
}
