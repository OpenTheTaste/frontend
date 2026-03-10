import { useQuery } from "@tanstack/react-query";
import { getSeriesEpisodesList } from "@entities/video-contents/api";

export function useSeriesEpisodeList(
  seriesMediaId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: ["series", "episodes", seriesMediaId],
    queryFn: () => getSeriesEpisodesList({ seriesMediaId, page: 0, size: 100 }),
    enabled: (options?.enabled ?? true) && !!seriesMediaId,
  });
}
