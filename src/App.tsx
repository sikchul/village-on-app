import { CapacitorBackButtonHandler, CapacitorOrientationHandler } from '@app/handler';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomeBase from '@pages/HomeBase';
import Login from '@pages/Login';
import ProfileInfos from '@pages/ProfileInfos';
import ProfileLikes from '@pages/ProfileLikes';
import ProfileReviews from '@pages/ProfileReviews';
import Reviews from '@pages/Reviews';
import VillageDetail from '@pages/VillageDetail';
import Villages from '@pages/Villages';
import { ROUTE_PATH } from '@shared/constants/route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import AuthProvider from './app/provider/AuthProvider';

setupIonicReact();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <AuthProvider>
            <IonRouterOutlet>
              <Route
                exact
                path={ROUTE_PATH.ROOT}
                render={() => <Redirect to={ROUTE_PATH.HOME} />}
              />
              <Route exact path={ROUTE_PATH.HOME} component={HomeBase} />
              <Route exact path={ROUTE_PATH.VILLAGES} component={Villages} />
              <Route exact path={ROUTE_PATH.VILLAGE_DETAIL} component={VillageDetail} />
              <Route exact path={ROUTE_PATH.REVIEWS} component={Reviews} />
              <Route exact path={ROUTE_PATH.LOGIN} component={Login} />
              <Route exact path={ROUTE_PATH.PROFILE_INFO} component={ProfileInfos} />
              <Route exact path={ROUTE_PATH.PROFILE_LIKE} component={ProfileLikes} />
              <Route exact path={ROUTE_PATH.PROFILE_REVIEW} component={ProfileReviews} />
            </IonRouterOutlet>
          </AuthProvider>
          <CapacitorBackButtonHandler />
          <CapacitorOrientationHandler />
        </IonReactRouter>
      </IonApp>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
