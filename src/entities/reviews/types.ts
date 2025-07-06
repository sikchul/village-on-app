import type { Review } from '@shared/api/supabase';

export interface ReviewImage {
  webPath: string;
  format: string;
  saved?: boolean;
}

export interface UpdateReviewRequestParams {
  villageId: number;
  profileId: string;
  review: string;
  images: ReviewImage[];
}

export interface ReviewListRequestParams {
  page: number;
  profile_id?: string;
  exprn_village_nm?: string;
}

export interface ReviewListItem {
  review_id: number;
  profile_id: string;
  village_id: number;
  review_images: string[] | null;
  comment: string;
  created_at: string;
  likes: number;
  avatar: string;
  nickname: string;
  exprn_village_nm: string;
}

export interface ReviewDetailRequestParams {
  id: Review['review_id'];
}
