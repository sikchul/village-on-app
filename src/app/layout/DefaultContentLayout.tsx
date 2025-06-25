import { IonRow } from '@ionic/react';
import type { DefaultComponentProps } from '@shared/types/props';
import { Col, Grid } from '@shared/ui/grid';
import { useEffect, useRef, type ReactNode } from 'react';

import styles from './DefaultContentLayout.module.scss';

interface DefaultContentLayoutProps extends DefaultComponentProps {
  extraContent?: ReactNode;
}

const SCROLL_TOP_OFFSET = {
  DEFAULT: 180,
  SCROLL: 60
};

export default function DefaultContentLayout({
  children,
  extraContent
}: DefaultContentLayoutProps) {
  const gridRef = useRef<HTMLIonGridElement>(null);
  const contentRowRef = useRef<HTMLIonRowElement>(null);

  const handleScroll = (event: Event) => {
    if (gridRef.current) {
      if ((event.target as HTMLIonRowElement).scrollTop > 40) {
        gridRef.current.style.top = `${SCROLL_TOP_OFFSET.SCROLL}px`;
      } else {
        gridRef.current.style.top = `${SCROLL_TOP_OFFSET.DEFAULT}px`;
      }
    }
  };

  useEffect(() => {
    const contentRow = contentRowRef.current;
    if (contentRow) {
      contentRow.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        contentRow.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <Grid
      ref={gridRef}
      style={{ top: `${SCROLL_TOP_OFFSET.DEFAULT}px` }}
      className={styles['default-content-layout']}
    >
      {extraContent && (
        <IonRow>
          <Col>{extraContent}</Col>
        </IonRow>
      )}
      <IonRow ref={contentRowRef} className={styles['content-row']}>
        <Col size="12">{children}</Col>
      </IonRow>
    </Grid>
  );
}
