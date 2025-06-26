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
  defaultScrollOffset = SCROLL_TOP_OFFSET.SCROLL
}: DefaultContentLayoutProps) {
  const gridRef = useRef<HTMLIonGridElement>(null);
  const contentRowRef = useRef<HTMLIonRowElement>(null);

  const handleScroll = useCallback(
    (event: Event) => {
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

  useEffect(() => {
    const contentRow = contentRowRef.current;
    const contentGrid = gridRef.current;

    if (contentRow && contentGrid) {
      contentRow.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        contentRow.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

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
