import { IonRow, IonText } from '@ionic/react';
import type { Village } from '@shared/api/supabase';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { useMemo } from 'react';

import styles from './VillageDetailBody.module.scss';
import VillageDetailChip from './VillageDetailChip';
import VillageDetailFooter from './VillageDetailFooter';
import VillageDetailInfo from './VillageDetailInfo';

interface VillageDetailBodyProps
  extends DefaultComponentProps,
    Pick<Village, 'rprsntv_nm' | 'phone_number' | 'exprn_cn' | 'village_id'> {}

export default function VillageDetailBody({
  rprsntv_nm,
  phone_number,
  exprn_cn,
  village_id
}: VillageDetailBodyProps) {
  const exprnCnList = useMemo(() => {
    const items = exprn_cn.split('+');
    return items
      .map((item) => item.trim().replace(/^_+|_+$/g, ''))
      .filter((item) => item.length > 0)
      .sort((a, b) => {
        return a.localeCompare(b);
      });
  }, [exprn_cn]);

  return (
    <Grid className={styles['village-detail-body']}>
      <IonRow className={styles['village-detail-info-row']}>
        <Col size="12">
          <IonText className={styles['village-detail-info-title']}>{'체험마을 기본정보'}</IonText>
        </Col>
        <Col size="6">
          <VillageDetailInfo label="대표자명" value={rprsntv_nm} iconPath="/person-icon.png" />
        </Col>
        <Col size="6">
          <VillageDetailInfo label="전화번호" value={phone_number} iconPath="/phone-icon.png" />
        </Col>
      </IonRow>
      <IonRow className={styles['village-detail-info-row']}>
        <Col size="12">
          <IonText className={styles['village-detail-info-title']}>{'체험프로그램 정보'}</IonText>
        </Col>
        <Col size="12">
          {exprnCnList.map((item, index) => (
            <VillageDetailChip key={`${item}-${index}`} label={item} index={index} />
          ))}
        </Col>
      </IonRow>
      <VillageDetailFooter phone_number={phone_number} village_id={village_id} />
    </Grid>
  );
}
