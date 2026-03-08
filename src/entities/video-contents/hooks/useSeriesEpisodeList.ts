import { useQuery } from "@tanstack/react-query";
import { getSeriesEpisodesList } from "@entities/video-contents/api";

export function useSeriesEpisodeList(seriesId: number) {
  return useQuery({
    queryKey: ["series", "episodes", seriesId],
    queryFn: () => getSeriesEpisodesList({ seriesId, page: 0, size: 100 }),
    enabled: !!seriesId,
  });
}
