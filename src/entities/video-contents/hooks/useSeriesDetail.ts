import { useQuery } from "@tanstack/react-query";
import { getSeriesDetail } from "../api/seriesDetail";

export function useSeriesDetail(mediaId: number) {
  return useQuery({
    queryKey: ["series", "detail", mediaId],
    queryFn: () => getSeriesDetail(mediaId),
    enabled: !!mediaId,
  });
}
