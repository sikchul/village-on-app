import { IonIcon, IonRow, IonText } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import type { PropsWithClassName } from '@shared/types/props';
import { Chip } from '@shared/ui/chip';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { chatboxOutline, heartOutline, personCircleOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './ProfileExtraContent.module.scss';

interface ProfileExtraContentProps extends PropsWithClassName {}

const TAB_LIST = [
  { label: '프로필', path: ROUTE_PATH.PROFILE_INFO, icon: personCircleOutline },
  { label: '좋아요', path: ROUTE_PATH.PROFILE_LIKE, icon: heartOutline },
  { label: '후기', path: ROUTE_PATH.PROFILE_REVIEW, icon: chatboxOutline }
];

export default function ProfileExtraContent({}: ProfileExtraContentProps) {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleClick = (path: string) => {
    history.replace(path);
  };
  return (
    <Grid className={styles['profile-extra-content']}>
      <IonRow className={styles['profile-extra-content-row']}>
        {TAB_LIST.map((tab) => (
          <Col key={tab.path} className={styles['profile-extra-content-col']}>
            <Chip
              onClick={() => handleClick(tab.path)}
              className={cn(styles['profile-extra-content-chip'], {
                [styles['selected']]: pathname === tab.path
              })}
            >
              <IonText className={styles['profile-extra-content-chip-text']}>
                <IonIcon
                  icon={tab.icon}
                  className={styles['profile-extra-content-chip-text-icon']}
                />
                {tab.label}
              </IonText>
            </Chip>
          </Col>
        ))}
      </IonRow>
    </Grid>
  );
}
