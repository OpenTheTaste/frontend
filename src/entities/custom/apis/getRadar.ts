import { api } from "@/shared/api";
import { ApiResponse } from "@/shared/types";

export interface RadarResponse { 
    popularity: number;
    immersion: number;
    mania: number;
    recency: number;
    reWatch: number;
}

export const getRadarApi = {
    getRadar: async (): Promise<ApiResponse<RadarResponse>> => {
        const response = await api.get<ApiResponse<RadarResponse>>('/radar');
        return response.data;
    },
}