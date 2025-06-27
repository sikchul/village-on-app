import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton, ToolbarButton } from '@app/toolbar';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { callOutline, chevronBackOutline } from 'ionicons/icons';
import { useCallback } from 'react';
import { useParams, type RouteComponentProps } from 'react-router-dom';

import styles from './VillageDetail.module.scss';

interface VillageDetailProps extends RouteComponentProps {}

export default function VillageDetail({}: VillageDetailProps) {
  const { id } = useParams<{ id: string }>();

  const handleCall = useCallback(() => {
    console.log('call', id);
  }, [id]);

  return (
    <IonPage className={styles['village-detail-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          <ToolbarButton icon={callOutline} onClick={handleCall} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout defaultOffset={236} defaultScrollOffset={80}>
          <div>TEST</div>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
