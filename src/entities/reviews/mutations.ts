import { supabase } from '@shared/api/supabase';

import type { ReviewImage, UpdateReviewRequestParams } from './types';

const uploadImages = async (images: ReviewImage[], villageId: number, profileId: string) => {
  const uploadedUrls: string[] = [];

  for (const image of images) {
    try {
      const response = await fetch(image.webPath);
      const blob = await response.blob();

      const fileName = `${profileId}/${villageId}/${Date.now()}-${Math.random()}.${image.format}`;
      const { error } = await supabase.storage.from('reviews').upload(fileName, blob);

      if (error) throw error;

      const {
        data: { publicUrl }
      } = supabase.storage.from('reviews').getPublicUrl(fileName);

      uploadedUrls.push(publicUrl);
    } catch {
      throw new Error('Failed to upload images');
    }
  }

  return uploadedUrls;
};

export const updateReview = async ({
  villageId,
  profileId,
  review,
  images
}: UpdateReviewRequestParams) => {
  try {
    let imageUrls: string[] = [];

    if (images.length > 0) {
      imageUrls = await uploadImages(images, villageId, profileId);
    }

    const { error } = await supabase.from('reviews').insert({
      profile_id: profileId,
      village_id: villageId,
      review_images: imageUrls,
      comment: review.trim()
    });
    if (error) {
      throw error;
    }
  } catch {
    throw new Error('Failed to save review');
  }
};

export const toggleReviewLike = async ({
  reviewId,
  userId
}: {
  reviewId: number;
  userId: string;
}) => {
  const { count } = await supabase
    .from('reviews_likes')
    .select('*', { count: 'exact', head: true })
    .eq('review_id', Number(reviewId))
    .eq('profile_id', userId);
  if (count === 0) {
    await supabase.from('reviews_likes').insert({
      review_id: Number(reviewId),
      profile_id: userId
    });
  } else {
    await supabase
      .from('reviews_likes')
      .delete()
      .eq('review_id', Number(reviewId))
      .eq('profile_id', userId);
  }
};
