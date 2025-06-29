import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton } from '@app/toolbar';
import { ProfileExtraContent } from '@features/profile/ui';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { DefaultPageComponentProps } from '@shared/types/props';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';

import styles from './Reviews.module.scss';

interface ReviewsProps extends DefaultPageComponentProps {}

export default function Reviews({}: ReviewsProps) {
  return (
    <IonPage className={styles['reviews-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout extraContent={<ProfileExtraContent />} defaultOffset={240}>
          <div style={{ padding: '16px' }}>{'준비중...'}</div>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
