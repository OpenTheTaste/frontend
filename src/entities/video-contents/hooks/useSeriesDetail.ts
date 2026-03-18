import { useQuery } from "@tanstack/react-query";
import { getSeriesDetail } from "@entities/video-contents/api";

export function useSeriesDetail(mediaId: number) {
  return useQuery({
    queryKey: ["series", "detail", mediaId],
    queryFn: () => getSeriesDetail(mediaId),
    enabled: !!mediaId,
  });
}
