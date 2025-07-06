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
