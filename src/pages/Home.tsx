import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { type RouteComponentProps } from 'react-router-dom';

interface HomeProps extends RouteComponentProps {}

export default function Home({}: HomeProps) {
  return (
    <IonPage>
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
