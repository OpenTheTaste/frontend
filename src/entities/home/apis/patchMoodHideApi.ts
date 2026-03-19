import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const patchMoodHideApi = async (refreshId: number) => {
  await api.patch(END_POINTS.MOOD_REFRESH_HIDE(refreshId), { refreshId });
};
