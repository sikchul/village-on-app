import { useMutateProfile } from '@entities/profiles/hooks';
import { IonAvatar, IonButton, IonIcon, IonInput, IonRow, IonText } from '@ionic/react';
import type { Profile } from '@shared/api/supabase';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { cameraOutline } from 'ionicons/icons';
import { useCallback, useRef, useState } from 'react';

import styles from './ProfileEditModal.module.scss';

interface ProfileEditModalProps {
  nickname: string;
  avatar: string;
  user: Profile | null;
  onDismiss: (nickname?: string, avatar?: string) => void;
}

export default function ProfileEditModal({
  nickname,
  avatar,
  user,
  onDismiss
}: ProfileEditModalProps) {
  const [newNickname, setNewNickname] = useState(nickname);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(avatar || '/person-icon.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile } = useMutateProfile();

  const handleImageSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }, []);

  const handleAvatarClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSave = useCallback(() => {
    if (user) {
      const hasNicknameChange = newNickname.trim() && newNickname !== nickname;
      const hasImageChange = selectedImage !== null;

      if (hasNicknameChange || hasImageChange) {
        updateProfile(
          {
            profileId: user.profile_id,
            nickname: newNickname.trim() || nickname,
            avatar: selectedImage
          },
          {
            onSuccess: () => {
              onDismiss(newNickname.trim() || nickname, selectedImage ? previewUrl : undefined);
            }
          }
        );
      } else {
        onDismiss();
      }
    } else {
      onDismiss();
    }
  }, [newNickname, nickname, selectedImage, previewUrl, updateProfile, onDismiss, user]);

  return (
    <>
      <Content className={cn(styles['profile-edit-modal'], 'ion-padding')}>
        <Grid>
          <IonRow className={styles['avatar-section']}>
            <Col className={styles['avatar-col']}>
              <div className={styles['avatar-container']} onClick={handleAvatarClick}>
                <IonAvatar className={styles['avatar']}>
                  <img alt="Profile avatar" src={previewUrl} />
                </IonAvatar>
                <div className={styles['avatar-overlay']}>
                  <IonIcon icon={cameraOutline} className={styles['camera-icon']} />
                </div>
              </div>
              <IonText className={styles['avatar-label']}>프로필 이미지 변경</IonText>
            </Col>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <Col>
              <IonInput
                className={styles['input-box']}
                label="닉네임"
                labelPlacement="stacked"
                placeholder="닉네임을 입력하세요"
                value={newNickname}
                onIonInput={(e) => setNewNickname(e.detail.value || '')}
                maxlength={20}
              />
            </Col>
          </IonRow>
          <IonRow>
            <Col>
              <IonButton expand="block" className={styles['confirm-button']} onClick={handleSave}>
                저장
              </IonButton>
            </Col>
          </IonRow>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageSelect}
          />
        </Grid>
      </Content>
    </>
  );
}
