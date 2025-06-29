import { useAuth } from '@app/provider/useAuth';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabButton, IonTabs } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { TabBar } from '@shared/ui/tabs';
import { homeOutline, imageOutline, leafOutline, personOutline } from 'ionicons/icons';
import { useMemo } from 'react';
import { Route, type RouteComponentProps } from 'react-router-dom';

import Home from './Home';
import styles from './HomeBase.module.scss';

interface HomeBaseProps extends RouteComponentProps {}

const TAB_BUTTONS = [
  {
    label: '홈',
    path: '',
    icon: homeOutline
  },
  {
    label: '휴양마을',
    path: ROUTE_PATH.VILLAGES,
    icon: leafOutline
  },
  {
    label: '체험후기',
    path: ROUTE_PATH.REVIEWS,
    icon: imageOutline
  },
  {
    label: '프로필',
    path: ROUTE_PATH.PROFILE_INFO,
    icon: personOutline
  }
];

export default function HomeBase({ match, history }: HomeBaseProps) {
  const { isAuthenticated, user } = useAuth();
  const tabButtons = useMemo(() => {
    return TAB_BUTTONS.map((item) => {
      let path = item.path;
      if (item.label === '프로필') {
        path = isAuthenticated && user ? ROUTE_PATH.PROFILE_INFO : ROUTE_PATH.LOGIN;
      }

      return {
        ...item,
        path,
        selected: match.url === `${match.url}${item.path}`
      };
    });
  }, [match.url, isAuthenticated, user]);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path={`${match.url}`} component={Home} />
      </IonRouterOutlet>
      <TabBar slot="bottom">
        {tabButtons.map((item) => (
          <IonTabButton
            className={styles['tab-button']}
            key={item.label}
            tab={item.path}
            selected={item.selected}
            onClick={() => {
              history.push(item.path);
            }}
          >
            <IonIcon aria-hidden="true" icon={item.icon} />
            <IonLabel>{item.label}</IonLabel>
          </IonTabButton>
        ))}
      </TabBar>
    </IonTabs>
  );
}
