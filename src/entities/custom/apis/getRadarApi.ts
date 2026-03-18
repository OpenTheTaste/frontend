import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

export interface RadarResponse {
  popularity: number;
  immersion: number;
  mania: number;
  recency: number;
  reWatch: number;
}

export const getRadarApi = async (): Promise<ApiResponse<RadarResponse>> => {
  const response = await api.get<ApiResponse<RadarResponse>>(END_POINTS.RADAR);
  return response.data;
};
