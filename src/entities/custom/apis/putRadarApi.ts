import { RadarResponse } from "@entities/custom/apis";
import { api } from "@shared/api";

export const putRadarApi = async (body: RadarResponse): Promise<void> => {
  await api.put("/radar", body);
};
