import { DefaultContentLayout } from '@app/layout';
import { useFetchVillageList } from '@entities/villages/hooks/useFetchVillageList';
import { VillageList } from '@features/villages/ui';
import { IonBackButton, IonButtons, IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline } from 'ionicons/icons';
import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, type RouteComponentProps } from 'react-router-dom';

import styles from './Villages.module.scss';

interface VillagesProps extends RouteComponentProps {}

export default function Villages({}: VillagesProps) {
  const triggetRef = useRef(false);
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const searchParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (query.get('type')) {
      params.type = query.get('type') as string;
    }
    if (query.get('location')) {
      params.location = query.get('location') as string;
    }
    return params;
  }, [query]);

  const {
    data: villages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useFetchVillageList(searchParams);

  const villageItems = useMemo(
    () => villages?.pages.flatMap((page) => page.items) ?? [],
    [villages]
  );
  // const totalCount = useMemo(() => villages?.pages[0]?.totalCount ?? 0, [villages]);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.8
  });

  useEffect(() => {
    if (!inView) {
      triggetRef.current = false;
      return;
    }

    if (inView && !isFetchingNextPage && hasNextPage && !triggetRef.current) {
      triggetRef.current = true;
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <IonPage className={styles['villages-page']}>
      <Header>
        <Toolbar>
          <IonButtons className={styles['back-button']} slot="start">
            <IonBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          </IonButtons>
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout
          extraContent={<div>extra</div>}
          defaultOffset={236}
          defaultScrollOffset={80}
        >
          <VillageList villages={villageItems} inViewRef={inViewRef} />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
