import { api } from "@/shared/api";
import { RadarResponse } from "./getRadar";

export const putRadarApi = {
  putRadar: async (body: RadarResponse): Promise<void> => {
    await api.put('/radar', body);
  },
};
