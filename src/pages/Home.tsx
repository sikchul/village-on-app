import { DefaultContentLayout } from '@app/layout';
import { HomeExtraContent, HomeList } from '@features/home/ui';
import { IonPage } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Home.module.scss';

interface HomeProps extends RouteComponentProps {}

export default function Home({}: HomeProps) {
  return (
    <IonPage className={styles['home-page']}>
      <Header>
        <Toolbar />
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<HomeExtraContent />}>
          <HomeList />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
