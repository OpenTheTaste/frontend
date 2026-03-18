import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, MediaType } from "@shared/types";

export interface MoodCardList {
  mediaId: number;
  posterUrl: string;
  mediaType: MediaType;
}

export interface MoodCardResponse {
  refreshId: number;
  imageId: string;
  subtitle: string;
  tags: string[];
  recommendedMediaList: MoodCardList[];
}

export const getMoodCardApi = async () =>
  await api.get<ApiResponse<MoodCardResponse>>(END_POINTS.MOOD_REFRESH_ACTIVE);
