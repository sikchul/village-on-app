import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonRow,
  IonText
} from '@ionic/react';
import type { Village } from '@shared/api/supabase';
import { type DefaultComponentProps } from '@shared/types/props';
import { Card } from '@shared/ui/card';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { locationOutline } from 'ionicons/icons';
import { useMemo } from 'react';

import styles from './VillageCard.module.scss';

interface VillageCardProps extends DefaultComponentProps {
  village: Village;
}

export default function VillageCard({ className, village }: VillageCardProps) {
  const { exprn_village_nm, rdnmadr, exprn_se } = village;
  const exprnSeList = useMemo(() => {
    return exprn_se.split('+');
  }, [exprn_se]);
  return (
    <Card className={cn(styles['village-card'], className)}>
      <img alt="card-background" src="card-bg.png" />
      <IonCardHeader>
        <IonCardTitle>{exprn_village_nm}</IonCardTitle>
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
      </IonCardHeader>
      <IonCardContent>
        {exprnSeList.map((se) => (
          <IonChip key={se} outline={true}>
            {se}
          </IonChip>
        ))}
      </IonCardContent>
    </Card>
  );
}
