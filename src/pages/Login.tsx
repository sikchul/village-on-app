import { DefaultContentLayout } from '@app/layout';
import { useAuth } from '@app/provider/useAuth';
import { ToolbarBackButton } from '@app/toolbar';
import { HomeExtraContent } from '@features/home/ui';
import { IonButton, IonPage, IonRow, IonText } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
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
        <DefaultContentLayout extraContent={<HomeExtraContent />}>
          <Grid className={styles['login-page-grid']}>
            <IonRow className={styles['login-page-title-row']}>
              <Col size={'12'} className={styles['login-page-title-col']}>
                <IonText className={styles['login-page-title']}>{'소셜 계정으로 로그인'}</IonText>
              </Col>
              <Col size={'12'} className={styles['login-page-title-col']}>
                <IonText className={styles['login-page-description']}>
                  {'간편하게 서비스를 이용해보세요.'}
                </IonText>
              </Col>
            </IonRow>
            <IonRow className={styles['login-button-row']}>
              <Col size={'12'} className={styles['login-button-col']}>
                <IonButton
                  className={styles['kakao-login-button']}
                  onClick={handleLogin}
                  expand="block"
                  fill="solid"
                >
                  <div className={styles['kakao-button-content']}>
                    <div className={styles['kakao-icon']}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 1C4.48 1 0 4.58 0 9C0 11.55 1.25 13.88 3.25 15.47L2.5 18.5C2.42 18.82 2.75 19.08 3.03 18.93L7.5 16.5C8.33 16.67 9.16 16.75 10 16.75C15.52 16.75 20 13.17 20 8.75C20 4.33 15.52 1 10 1Z"
                          fill="#3C1E1E"
                        />
                      </svg>
                    </div>
                    <span className={styles['kakao-button-text']}>카카오톡으로 로그인</span>
                  </div>
                </IonButton>
              </Col>
            </IonRow>
          </Grid>
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
