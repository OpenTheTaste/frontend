import { useQuery } from "@tanstack/react-query";
import { tagRecommendPlaylistApi } from "@entities/dashboard/api";

export function useTagRecommendPlaylist(tagId: number) {
  return useQuery({
    queryKey: ["tagRecommendPlaylist", tagId],
    queryFn: async () => {
      const res = await tagRecommendPlaylistApi.getTagRecommendPlaylist(tagId);
      return res.data.data;
    },
    enabled: !!tagId,
  });
}