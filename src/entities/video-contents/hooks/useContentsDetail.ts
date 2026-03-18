import { useQuery } from "@tanstack/react-query";
import { getContentsDetailApi } from "@entities/video-contents/api";

export function useContentsDetail(mediaId: number) {
  return useQuery({
    queryKey: ["contents", "detail", mediaId],
    queryFn: () => getContentsDetailApi(mediaId),
    enabled: !!mediaId,
  });
}
