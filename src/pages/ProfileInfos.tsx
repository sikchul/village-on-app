import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton } from '@app/toolbar';
import { ProfileExtraContent, ProfileInfo } from '@features/profile/ui';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultPageComponentProps } from '@shared/types/props';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';

import styles from './ProfileInfos.module.scss';

interface ProfileInfosProps extends DefaultPageComponentProps {}

export default function ProfileInfos({}: ProfileInfosProps) {
  return (
    <IonPage className={styles['profile-infos-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<ProfileExtraContent />} defaultOffset={240}>
          <ProfileInfo />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
