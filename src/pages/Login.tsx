import { DefaultContentLayout } from '@app/layout';
import { useAuth } from '@app/provider/AuthProvider';
import { ToolbarBackButton } from '@app/toolbar';
import { IonButton, IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Login.module.scss';

interface LoginProps extends RouteComponentProps {}

export default function Login({}: LoginProps) {
  const { signInForKakao } = useAuth();

  const handleLogin = async () => {
    await signInForKakao();
  };

  return (
    <IonPage className={styles['login-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<div>extra</div>}>
          <IonButton onClick={handleLogin}>Login</IonButton>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
