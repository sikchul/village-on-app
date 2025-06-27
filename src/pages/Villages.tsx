import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton, ToolbarButton } from '@app/toolbar';
import { useFetchVillageList } from '@entities/villages/hooks/useFetchVillageList';
import { VillageFilterModal, VillageList } from '@features/villages/ui';
import type { FilterParams } from '@features/villages/ui/VillageFilterModal';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { useModal } from '@shared/hooks';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline, filterOutline } from 'ionicons/icons';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useHistory, useLocation, type RouteComponentProps } from 'react-router-dom';

import styles from './Villages.module.scss';

interface VillagesProps extends RouteComponentProps {}

export default function Villages({}: VillagesProps) {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.8
  });

  const triggetRef = useRef(false);
  const { replace } = useHistory();
  const { search, pathname } = useLocation();
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

  const totalCount = useMemo(() => villages?.pages[0]?.totalCount ?? 0, [villages]);

  const filterArray = useMemo(() => {
    const list: { label: string; value: string; onRemove: () => void }[] = [];
    if (query.get('location')) {
      list.push({
        label: '지역',
        value: query.get('location') || '',
        onRemove: () => {
          const params = new URLSearchParams();
          if (query.get('type')) {
            params.append('type', query.get('type') as string);
          }
          replace({
            pathname,
            search: params.toString()
          });
        }
      });
    }
    if (query.get('type')) {
      list.push({
        label: '분야',
        value: query.get('type') || '',
        onRemove: () => {
          const params = new URLSearchParams();
          if (query.get('location')) {
            params.append('location', query.get('location') as string);
          }
          replace({
            pathname,
            search: params.toString()
          });
        }
      });
    }
    return list;
  }, [query, replace, pathname]);

  const { present: presentFilterModal, dismiss: dismissFilterModal } = useModal(
    VillageFilterModal,
    {
      location: (query.get('location') as string) || '',
      type: (query.get('type') as string) || '',
      onDismiss: ({ location, type }: FilterParams) => {
        const params = new URLSearchParams();

        if (location) {
          params.append('location', location);
        }
        if (type) {
          params.append('type', type);
        }

        replace({
          pathname,
          search: params.toString()
        });
        dismissFilterModal();
      }
    }
  );

  const handleFilter = useCallback(() => {
    presentFilterModal({
      breakpoints: [0, 0.35],
      initialBreakpoint: 0.35,
      backdropBreakpoint: 0
    });
  }, [presentFilterModal]);

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
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          <ToolbarButton icon={filterOutline} onClick={handleFilter} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout defaultOffset={236} defaultScrollOffset={80}>
          <VillageList
            villages={villageItems}
            inViewRef={inViewRef}
            totalCount={totalCount}
            filterArray={filterArray}
          />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
