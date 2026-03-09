import { useQuery } from "@tanstack/react-query";
import { getSeriesEpisodesList } from "@entities/video-contents/api";

export function useSeriesEpisodeList(seriesMediaId: number) {
  return useQuery({
    queryKey: ["series", "episodes", seriesMediaId],
    queryFn: () => getSeriesEpisodesList({ seriesMediaId, page: 0, size: 100 }),
    enabled: !!seriesMediaId,
  });
}
