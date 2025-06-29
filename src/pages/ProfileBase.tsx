import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton } from '@app/toolbar';
import { ProfileExtraContent, ProfileInfo, ProfileLike, ProfileReview } from '@features/profile/ui';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultPageComponentProps } from '@shared/types/props';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';
import { Route } from 'react-router-dom';

import styles from './ProfileBase.module.scss';

interface ProfileBaseProps extends DefaultPageComponentProps {}

export default function ProfileBase({}: ProfileBaseProps) {
  return (
    <IonPage className={styles['profile-base-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<ProfileExtraContent />} defaultOffset={240}>
          <IonRouterOutlet>
            <Route exact path={ROUTE_PATH.PROFILE_INFO} component={ProfileInfo} />
            <Route exact path={ROUTE_PATH.PROFILE_LIKE} component={ProfileLike} />
            <Route exact path={ROUTE_PATH.PROFILE_REVIEW} component={ProfileReview} />
          </IonRouterOutlet>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
