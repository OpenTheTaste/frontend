import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const putPlaybackApi = async (mediaId: number, positionSec: number) => {
  await api.put(END_POINTS.PLAYBACK, { mediaId, positionSec });
};
