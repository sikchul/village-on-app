import type { ScrollDetail } from '@ionic/react';
import { IonButton, IonPage, IonTitle } from '@ionic/react';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { useState } from 'react';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Home.module.scss';

interface HomeProps extends RouteComponentProps {}

export default function Home({}: HomeProps) {
  const [position, setPosition] = useState(160);
  const handleScroll = (event: CustomEvent<ScrollDetail>) => {
    console.log(event.detail.scrollTop);
  };

  return (
    <IonPage className={styles['home-page']}>
      <Header>
        <Toolbar>
          <IonTitle></IonTitle>
        </Toolbar>
      </Header>
      <Content scrollEvents={true} onIonScroll={handleScroll}>
        <div
          style={{
            marginTop: `${position}px`,
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            height: '100%',
            transition: 'margin-top 0.3s ease-in-out'
          }}
        >
          <div
            style={{
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              margin: ' 0px 16px 16px 16px'
            }}
          ></div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              overflow: 'auto',
              height: '100%'
            }}
          >
            <IonButton onClick={() => setPosition(160)}>Scroll to top</IonButton>
            <div
              style={{
                padding: '16px',
                marginBottom: '40px',
                paddingTop: '40px'
              }}
            >
              Home
            </div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <IonButton onClick={() => setPosition(56)}>Scroll to top</IonButton>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px', marginBottom: '40px' }}>Home</div>
            <div style={{ padding: '16px' }}>Home</div>
          </div>
        </div>
      </Content>
    </IonPage>
  );
}
