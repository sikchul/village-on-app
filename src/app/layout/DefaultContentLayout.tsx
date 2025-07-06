import { IonRow } from '@ionic/react';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';

import styles from './DefaultContentLayout.module.scss';

interface DefaultContentLayoutProps extends DefaultComponentProps {
  extraContent?: ReactNode;
  defaultOffset?: number;
  defaultScrollOffset?: number;
  isFixed?: boolean;
}

const SCROLL_TOP_OFFSET = {
  DEFAULT: 180,
  SCROLL: 40
};

export default function DefaultContentLayout({
  className,
  children,
  extraContent,
  defaultOffset = SCROLL_TOP_OFFSET.DEFAULT,
  defaultScrollOffset = SCROLL_TOP_OFFSET.SCROLL,
  isFixed = false
}: DefaultContentLayoutProps) {
  const gridRef = useRef<HTMLIonGridElement>(null);
  const contentRowRef = useRef<HTMLIonRowElement>(null);
  const lockRef = useRef(false);

  const handleScroll = useCallback(
    (event: Event) => {
      if (lockRef.current) return;

      if (gridRef.current) {
        if ((event.target as HTMLIonRowElement).scrollTop > 10) {
          gridRef.current.style.top = `${defaultScrollOffset}px`;
        } else {
          gridRef.current.style.top = `${defaultOffset}px`;
        }
      }
    },
    [defaultScrollOffset, defaultOffset]
  );

  const handleTransitionEnd = useCallback(() => {
    lockRef.current = false;
  }, []);

  const handleTransitionStart = useCallback(() => {
    lockRef.current = true;
  }, []);

  useEffect(() => {
    const contentRow = contentRowRef.current;
    const contentGrid = gridRef.current;

    if (contentRow && contentGrid && !isFixed) {
      contentRow.addEventListener('scroll', handleScroll, { passive: true });
      contentGrid.addEventListener('transitionend', handleTransitionEnd, { passive: true });
      contentGrid.addEventListener('transitionstart', handleTransitionStart, { passive: true });
      return () => {
        contentRow.removeEventListener('scroll', handleScroll);
        contentGrid.removeEventListener('transitionend', handleTransitionEnd);
        contentGrid.removeEventListener('transitionstart', handleTransitionStart);
      };
    }
  }, [handleScroll, handleTransitionEnd, handleTransitionStart, isFixed]);

  return (
    <Grid
      ref={gridRef}
      style={{ top: `${defaultOffset}px` }}
      className={cn(styles['default-content-layout'], className)}
    >
      {extraContent && (
        <IonRow>
          <Col>{extraContent}</Col>
        </IonRow>
      )}
      <IonRow ref={contentRowRef} className={cn(styles['content-row'])}>
        <Col size="12">{children}</Col>
      </IonRow>
    </Grid>
  );
}
