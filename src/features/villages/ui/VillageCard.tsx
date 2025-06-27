import { IonCardSubtitle, IonCardTitle, IonIcon, IonRow, IonText } from '@ionic/react';
import type { Village } from '@shared/api/supabase';
import { type DefaultComponentProps } from '@shared/types/props';
import { Card, CardContent, CardHeader } from '@shared/ui/card';
import { Chip } from '@shared/ui/chip';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { locationOutline } from 'ionicons/icons';
import { useMemo } from 'react';

import styles from './VillageCard.module.scss';

interface VillageCardProps extends DefaultComponentProps {
  village: Village;
  index?: number;
}

export default function VillageCard({ className, village, index = 0 }: VillageCardProps) {
  const { exprn_village_nm, rdnmadr, exprn_se } = village;
  const exprnSeList = useMemo(() => {
    const items = exprn_se.split('+');
    return items.sort((a, b) => {
      if (a === '기타') return 1;
      if (b === '기타') return -1;
      return a.localeCompare(b);
    });
  }, [exprn_se]);

  const backgroundImage = useMemo(() => {
    const imageIndex = index % 3;
    return `card-bg-${imageIndex}.png`;
  }, [index]);

  return (
    <Card className={cn(styles['village-card'], className)}>
      <img alt="card-background" src={backgroundImage} />
      <CardHeader>
        <IonCardTitle className={styles['card-title']}>{exprn_village_nm}</IonCardTitle>
        <IonCardSubtitle>
          <Grid>
            <IonRow className="ion-align-items-center">
              <Col size="0.8">
                <IonText className={styles['subtitle-text']}>
                  <IonIcon icon={locationOutline}></IonIcon>
                </IonText>
              </Col>
              <Col>
                <IonText>{rdnmadr}</IonText>
              </Col>
            </IonRow>
          </Grid>
        </IonCardSubtitle>
      </CardHeader>
      <CardContent>
        {exprnSeList.map((se, index) => {
          const colors = ['primary', 'success', 'danger'] as const;
          const color = colors[index % colors.length];
          return (
            <Chip key={`${se}-${index}`} outline={false} color={color}>
              {se}
            </Chip>
          );
        })}
      </CardContent>
    </Card>
  );
}
