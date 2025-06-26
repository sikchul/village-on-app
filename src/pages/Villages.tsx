import { DefaultContentLayout } from '@app/layout';
import { IonPage } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Villages.module.scss';

interface VillagesProps extends RouteComponentProps {}

export default function Villages({}: VillagesProps) {
  return (
    <IonPage className={styles['villages-page']}>
      <Header>
        <Toolbar />
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<div>extra</div>}>
          <div>list</div>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
