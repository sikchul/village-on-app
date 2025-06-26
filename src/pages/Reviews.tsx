import { DefaultContentLayout } from '@app/layout';
import { IonPage } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Reviews.module.scss';

interface ReviewsProps extends RouteComponentProps {}

export default function Reviews({}: ReviewsProps) {
  return (
    <IonPage className={styles['reviews-page']}>
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
