import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton, ToolbarButton } from '@app/toolbar';
import { useFetchVillageDetail } from '@entities/villages/hooks';
import { VillageDetailBody, VillageDetailHeader } from '@features/villages/ui/detail';
import { IonPage, IonRow } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline, locationOutline } from 'ionicons/icons';
import { useCallback } from 'react';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './VillageDetail.module.scss';

interface VillageDetailProps extends RouteComponentProps<{ id: string }> {}

export default function VillageDetail({ match }: VillageDetailProps) {
  const { id } = match.params;
  const { data: villageDetail } = useFetchVillageDetail({ id: Number(id) });
  const {
    village_id,
    exprn_village_nm = '',
    rdnmadr,
    likes = 0,
    rprsntv_nm,
    phone_number,
    exprn_cn,
    latitude,
    longitude,
    is_liked
  } = villageDetail || {};

  const handleMap = useCallback(() => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      const userAgent = navigator.userAgent.toLowerCase();
      let mapUrl = '';

      if (/iphone|ipad|ipod/.test(userAgent)) {
        mapUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
      } else if (/android/.test(userAgent)) {
        mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
          exprn_village_nm
        )}?c=${longitude},${latitude},15,0,0,0,dh`;
      } else {
        mapUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
      }

      window.open(mapUrl, '_blank');
    } catch {
      try {
        const fallbackUrl = `https://map.daum.net/link/map/${exprn_village_nm},${latitude},${longitude}`;
        window.open(fallbackUrl, '_blank');
      } catch {
        throw new Error('Failed to open map app');
      }
    }
  }, [latitude, longitude, exprn_village_nm]);

  return (
    <IonPage className={styles['village-detail-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          <ToolbarButton
            icon={locationOutline}
            onClick={handleMap}
            disabled={!latitude || !longitude}
          />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout defaultOffset={240} defaultScrollOffset={100}>
          <Grid className={styles['village-detail-layout']}>
            <IonRow className={styles['village-detail-row']}>
              <Col>
                <VillageDetailHeader
                  village_id={village_id || 0}
                  exprn_village_nm={exprn_village_nm || '-'}
                  rdnmadr={rdnmadr || '-'}
                  likes={likes}
                  is_liked={is_liked || false}
                />
              </Col>
            </IonRow>
            <IonRow className={styles['village-detail-row']}>
              <Col>
                <VillageDetailBody
                  village_id={village_id || 0}
                  rprsntv_nm={rprsntv_nm || '-'}
                  phone_number={phone_number || '-'}
                  exprn_cn={exprn_cn || '-'}
                />
              </Col>
            </IonRow>
          </Grid>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
