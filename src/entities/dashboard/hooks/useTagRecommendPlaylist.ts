import { useQuery } from "@tanstack/react-query";
import { getTagRecommendPlaylistApi } from "@entities/dashboard/api";

export function useTagRecommendPlaylist(tagId: number) {
  return useQuery({
    queryKey: ["tagRecommendPlaylist", tagId],
    queryFn: async () => {
      const res = await getTagRecommendPlaylistApi(tagId);
      return res.data.data;
    },
    enabled: !!tagId,
  });
}
