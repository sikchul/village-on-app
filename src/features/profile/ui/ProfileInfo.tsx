import { useAuth } from '@app/provider/useAuth';
import { IonAvatar, IonButton, IonIcon, IonRow, IonText } from '@ionic/react';
import { ROUTE_PATH } from '@shared/constants/route';
import { useModal } from '@shared/hooks';
import type { PropsWithClassName } from '@shared/types/props';
import { Chip } from '@shared/ui/chip';
import { Col, Grid } from '@shared/ui/grid';
import { mailOutline, pencilOutline, personCircleOutline } from 'ionicons/icons';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ProfileEditModal from './ProfileEditModal';
import styles from './ProfileInfo.module.scss';

interface ProfileInfoProps extends PropsWithClassName {}

export default function ProfileInfo({}: ProfileInfoProps) {
  const { user, signOut, updateProfileInfo } = useAuth();
  const history = useHistory();
  const [name, setName] = useState(user?.nickname || '-');
  const [avatar, setAvatar] = useState(user?.avatar || '/person-icon.png');

  const { present: presentEditNicknameModal, dismiss: dismissEditNicknameModal } = useModal(
    ProfileEditModal,
    {
      nickname: name,
      avatar,
      user,
      onDismiss: async (newNickname?: string, newAvatar?: string) => {
        await updateProfileInfo(user?.profile_id || '');
        if (newNickname) {
          setName(newNickname);
        }
        if (newAvatar) {
          setAvatar(newAvatar);
        }
        dismissEditNicknameModal();
      }
    }
  );

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleEditNickname = useCallback(() => {
    presentEditNicknameModal({
      breakpoints: [0, 0.7],
      initialBreakpoint: 0.7,
      backdropBreakpoint: 0
    });
  }, [presentEditNicknameModal]);

  useEffect(() => {
    if (!user) {
      history.replace(ROUTE_PATH.ROOT);
    }
  }, [user, history]);

  return (
    <Grid className={styles['profile-info']}>
      <IonText className={styles['profile-info-title']}>사용자 정보</IonText>
      <IonRow className={styles['profile-info-row']}>
        <IonButton
          shape="round"
          size="small"
          className={styles['profile-info-edit-button']}
          onClick={handleEditNickname}
        >
          <IonIcon icon={pencilOutline} slot="icon-only" />
        </IonButton>
        <Col className={styles['profile-info-avatar-col']}>
          <IonAvatar>
            <img
              alt="Silhouette of a person's head"
              src={`${avatar}${avatar.includes('blob') ? '' : '?v=' + Date.now()}`}
            />
          </IonAvatar>
        </Col>
        <Col className={styles['profile-info-text-col']}>
          <IonRow className={styles['profile-info-text-row']}>
            <Col className={styles['profile-info-text-col']}>
              <Chip className={styles['profile-info-text-chip']}>
                <IonIcon
                  icon={personCircleOutline}
                  className={styles['profile-info-text-chip-icon']}
                />
                <IonText>{name}</IonText>
              </Chip>
            </Col>
            <Col className={styles['profile-info-text-col']}>
              <Chip className={styles['profile-info-text-chip']}>
                <IonIcon icon={mailOutline} className={styles['profile-info-text-chip-icon']} />
                <IonText>{user?.useremail || '-'}</IonText>
              </Chip>
            </Col>
          </IonRow>
        </Col>
      </IonRow>
      <IonRow className={styles['profile-info-logout-row']}>
        <Col className={styles['profile-info-logout-col']}>
          <IonButton
            className={styles['profile-info-logout-button']}
            shape="round"
            onClick={handleLogout}
          >
            로그아웃
          </IonButton>
        </Col>
      </IonRow>
    </Grid>
  );
}
