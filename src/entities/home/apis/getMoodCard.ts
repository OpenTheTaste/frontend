import { api } from "@shared/api";
import {
    ApiResponse,
    MediaType
 } from "@shared/types";

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

export const getMoodCardApi = {
    getMoodCards: async () => await api.get<ApiResponse<MoodCardResponse>>("/mood-refresh/active",)
};