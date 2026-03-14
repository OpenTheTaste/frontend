import { api } from "@/shared/api";

export const playbackApi = async (mediaId: number, positionSec: number) => {
  await api.put("/playback", { mediaId, positionSec });
};
