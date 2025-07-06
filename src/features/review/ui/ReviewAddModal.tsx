import { Camera } from '@capacitor/camera';
import { useMutateReview } from '@entities/reviews/hooks';
import type { ReviewImage } from '@entities/reviews/types';
import { IonButton, IonIcon, IonImg, IonRow, IonText, IonTextarea } from '@ionic/react';
import type { Profile } from '@shared/api/supabase';
import { Content } from '@shared/ui/content';
import { Col, Grid } from '@shared/ui/grid';
import cn from 'classnames';
import { addOutline, closeOutline, imagesOutline } from 'ionicons/icons';
import { useCallback, useState } from 'react';

import styles from './ReviewAddModal.module.scss';

interface ReviewAddModalProps {
  villageId: number;
  user: Profile | null;
  onDismiss: () => void;
}

const MAX_IMAGES = 3;

export default function ReviewAddModal({ villageId, user, onDismiss }: ReviewAddModalProps) {
  const [review, setReview] = useState('');
  const [images, setImages] = useState<ReviewImage[]>([]);
  const { mutate: updateReview, isPending: isUploading } = useMutateReview();

  const handleImageSelect = useCallback(async () => {
    try {
      const selectedImages = await Camera.pickImages({
        quality: 90,
        limit: MAX_IMAGES - images.length,
        correctOrientation: true
      });

      const newImages = selectedImages.photos.map((img) => ({
        webPath: img.webPath,
        format: img.format
      }));

      setImages((prev) => [...prev, ...newImages]);
    } catch {
      throw new Error('Failed to select images');
    }
  }, [images.length]);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSave = useCallback(async () => {
    if (!user || !review.trim()) return;

    updateReview(
      {
        villageId,
        profileId: user.profile_id,
        review: review.trim(),
        images
      },
      {
        onSuccess: () => {
          onDismiss();
        }
      }
    );
  }, [user, review, images, villageId, updateReview, onDismiss]);

  return (
    <>
      <Content className={cn(styles['review-add-modal'], 'ion-padding')}>
        <Grid>
          <IonRow className={styles['review-image-section']}>
            <Col className={styles['review-image-col']}>
              {images.length === 0 ? (
                <div className={styles['image-selector']} onClick={handleImageSelect}>
                  <IonIcon icon={imagesOutline} className={styles['selector-icon']} />
                  <IonText className={styles['selector-text']}>
                    사진을 선택해주세요 ({images.length}/{MAX_IMAGES})
                  </IonText>
                </div>
              ) : (
                <div className={styles['image-preview-container']}>
                  <div className={styles['image-grid']}>
                    {images.map((image, index) => (
                      <div key={index} className={styles['image-item']}>
                        <IonImg
                          src={image.webPath}
                          alt={`리뷰 이미지 ${index + 1}`}
                          className={styles['preview-image']}
                        />
                        <button
                          className={styles['remove-button']}
                          onClick={() => removeImage(index)}
                        >
                          <IonIcon icon={closeOutline} />
                        </button>
                      </div>
                    ))}
                    {images.length < MAX_IMAGES && (
                      <div className={styles['add-more-button']} onClick={handleImageSelect}>
                        <IonIcon icon={addOutline} className={styles['add-icon']} />
                        <IonText className={styles['add-text']}>
                          추가 ({images.length}/{MAX_IMAGES})
                        </IonText>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Col>
          </IonRow>
          <IonRow className="ion-margin-bottom">
            <Col>
              <IonTextarea
                className={styles['textarea-box']}
                label="리뷰"
                labelPlacement="stacked"
                placeholder="리뷰를 입력하세요"
                value={review}
                onIonInput={(e) => setReview(e.detail.value || '')}
                maxlength={200}
              />
            </Col>
          </IonRow>
          <IonRow>
            <Col>
              <IonButton
                expand="block"
                className={styles['confirm-button']}
                onClick={handleSave}
                disabled={!review.trim() || isUploading}
              >
                {isUploading ? '등록 중...' : '리뷰등록'}
              </IonButton>
            </Col>
          </IonRow>
        </Grid>
      </Content>
    </>
  );
}
