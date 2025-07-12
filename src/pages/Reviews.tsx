import { DefaultContentLayout } from '@app/layout';
import { ToolbarBackButton, ToolbarButton } from '@app/toolbar';
import { useFetchReviewList } from '@entities/reviews/hooks/useFetchReviewList';
import { ReviewList } from '@features/review/ui';
import type { FilterParams } from '@features/review/ui/ReviewFilterModal';
import ReviewFilterModal from '@features/review/ui/ReviewFilterModal';
import { IonPage } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { useModal } from '@shared/hooks';
import type { DefaultPageComponentProps } from '@shared/types/props';
import { Content } from '@shared/ui/content';
import { Header, Toolbar } from '@shared/ui/toolbar';
import { chevronBackOutline, filterOutline } from 'ionicons/icons';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './Reviews.module.scss';

interface ReviewsProps extends DefaultPageComponentProps {}

export default function Reviews({}: ReviewsProps) {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.8
  });

  const triggetRef = useRef(false);
  const { replace } = useHistory();
  const { search, pathname } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const searchParams = useMemo(() => {
    const params: Record<string, string> = {};
    if (query.get('exprn_village_nm')) {
      params.exprn_village_nm = query.get('exprn_village_nm') as string;
    }
    return params;
  }, [query]);

  const {
    data: reviews,
    isLoading: isLoadingReviewList,
    isFetching: isFetchingReviewList,
    isError: isErrorReviewList,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch: refetchReviewList
  } = useFetchReviewList(searchParams);

  const reviewItems = useMemo(() => reviews?.pages.flatMap((page) => page.items) ?? [], [reviews]);

  const totalCount = useMemo(() => reviews?.pages[0]?.totalCount ?? 0, [reviews]);

  const filterArray = useMemo(() => {
    const list: { label: string; value: string; onRemove: () => void }[] = [];
    if (query.get('exprn_village_nm')) {
      list.push({
        label: '체험휴양마을명',
        value: query.get('exprn_village_nm') || '',
        onRemove: () => {
          const params = new URLSearchParams();
          replace({
            pathname,
            search: params.toString()
          });
        }
      });
    }
    return list;
  }, [query, replace, pathname]);

  const { present: presentReviewFilterModal, dismiss: dismissReviewFilterModal } = useModal(
    ReviewFilterModal,
    {
      exprn_village_nm: (query.get('exprn_village_nm') as string) || '',
      onDismiss: ({ exprn_village_nm }: FilterParams) => {
        const params = new URLSearchParams();

        if (exprn_village_nm) {
          params.append('exprn_village_nm', exprn_village_nm);
        }

        replace({
          pathname,
          search: params.toString()
        });
        dismissReviewFilterModal();
      }
    }
  );

  const handleFilter = useCallback(() => {
    presentReviewFilterModal({
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      backdropBreakpoint: 0
    });
  }, [presentReviewFilterModal]);

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
    <IonPage className={styles['reviews-page']}>
      <Header>
        <Toolbar>
          <ToolbarBackButton icon={chevronBackOutline} defaultHref={ROUTE_PATH.HOME} />
          <ToolbarButton icon={filterOutline} onClick={handleFilter} />
        </Toolbar>
      </Header>
      <Content>
        <DefaultContentLayout
          className={styles['default-content-layout']}
          defaultOffset={240}
          defaultScrollOffset={100}
        >
          <ReviewList
            reviews={reviewItems}
            inViewRef={inViewRef}
            totalCount={totalCount}
            filterArray={filterArray}
            isLoading={isLoadingReviewList || isFetchingReviewList}
            isError={isErrorReviewList}
            isFetchingNext={isFetchingNextPage}
            refetch={async () => {
              await refetchReviewList();
            }}
          />
        </DefaultContentLayout>
      </Content>
    </IonPage>
  );
}
