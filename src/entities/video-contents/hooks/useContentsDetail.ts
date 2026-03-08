import { useQuery } from "@tanstack/react-query";
import { getContentsDetail } from "@entities/video-contents/api";

export function useContentsDetail(mediaId: number) {
  return useQuery({
    queryKey: ["contents", "detail", mediaId],
    queryFn: () => getContentsDetail(mediaId),
    enabled: !!mediaId,
  });
}
