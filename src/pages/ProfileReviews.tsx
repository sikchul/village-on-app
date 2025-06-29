import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton } from '@app/toolbar';
import { ProfileExtraContent, ProfileReview } from '@features/profile/ui';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultPageComponentProps } from '@shared/types/props';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';

import styles from './ProfileReviews.module.scss';

interface ProfileReviewsProps extends DefaultPageComponentProps {}

export default function ProfileReviews({}: ProfileReviewsProps) {
  return (
    <IonPage className={styles['profile-reviews-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout
          className={styles['default-content-layout']}
          extraContent={<ProfileExtraContent />}
          defaultOffset={240}
        >
          <ProfileReview />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
