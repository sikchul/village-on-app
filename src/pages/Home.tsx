import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Home.module.scss';

interface HomeProps extends RouteComponentProps {}

export default function Home({}: HomeProps) {
  return (
    <IonPage className={styles['home-page']}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>Home</div>
      </IonContent>
    </IonPage>
  );
}
