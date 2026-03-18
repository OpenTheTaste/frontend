import { api } from "@shared/api";

export const putPlaybackApi = async (mediaId: number, positionSec: number) => {
  await api.put("/playback", { mediaId, positionSec });
};
