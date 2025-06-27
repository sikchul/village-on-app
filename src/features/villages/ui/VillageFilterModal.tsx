import { useFetchVillageLocationList, useFetchVillageTypeList } from '@entities/villages/hooks';
import { IonButton, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { useState } from 'react';

import styles from './VillageFilterModal.module.scss';

export type FilterParams = {
  location: string;
  type: string;
};

export interface VillageFilterModalProps {
  location: string;
  type: string;
  onDismiss: (params: FilterParams) => void;
}

export default function VillageFilterModal({ location, type, onDismiss }: VillageFilterModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>(location || '');
  const [selectedType, setSelectedType] = useState<string>(type || '');

  const { data: villageLocationList } = useFetchVillageLocationList();
  const { data: villageTypeList } = useFetchVillageTypeList();

  const handleApply = () => {
    onDismiss({
      location: selectedLocation || '',
      type: selectedType || ''
    });
  };

  return (
    <>
      <Content className={cn(styles['village-filter-modal'], 'ion-padding')}>
        <Grid>
          <IonRow className="ion-margin-bottom">
            <Col>
              <IonSelect
                label="지역"
                labelPlacement="stacked"
                placeholder="모든 지역"
                value={selectedLocation}
                onIonChange={(e) => setSelectedLocation(e.detail.value)}
                interface="action-sheet"
                className={styles['select-box']}
              >
                {villageLocationList?.map((item) => {
                  return (
                    <IonSelectOption key={item.institution_nm} value={item.institution_nm}>
                      {item.institution_nm}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </Col>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <Col>
              <IonSelect
                label="체험휴양마을 유형"
                labelPlacement="stacked"
                placeholder="모든 체험휴양마을 유형"
                value={selectedType}
                onIonChange={(e) => setSelectedType(e.detail.value)}
                interface="action-sheet"
                className={styles['select-box']}
              >
                {villageTypeList?.map((item) => {
                  return (
                    <IonSelectOption key={item.type_name} value={item.type_name}>
                      {item.type_name}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
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
