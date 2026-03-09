import { api } from "@shared/api";
import { ApiResponse, TagPlaylistResponse } from "@shared/types";

export const tagRecommendPlaylistApi = {
  getTagRecommendPlaylist: async (tagId: number) =>
    await api.get<ApiResponse<TagPlaylistResponse>>(`/playlists/tags/${tagId}`),
};