import { RadarResponse } from "@entities/custom/apis";
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const putRadarApi = async (body: RadarResponse): Promise<void> => {
  await api.put(END_POINTS.RADAR, body);
};
