import { DefaultContentLayout } from '@app/layout';
import { useAuth } from '@app/provider/useAuth';
import { ToolbarBackButton } from '@app/toolbar';
import { IonButton, IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';
import { type RouteComponentProps } from 'react-router-dom';

import styles from './Profile.module.scss';

interface ProfileProps extends RouteComponentProps {}

export default function Profile({}: ProfileProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <IonPage className={styles['profile-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<div>extra</div>}>
          <IonButton onClick={handleLogout}>Logout</IonButton>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
