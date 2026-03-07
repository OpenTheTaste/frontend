import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLikes } from "@entities/likes/api";

export function useLikes() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (mediaId: number) => postLikes(mediaId),
    onSuccess: (_data, mediaId) => {
      queryClient.invalidateQueries({
        queryKey: ["contents", "detail", mediaId],
      });
    },
    onError: (error) => {
      console.error("좋아요 실패", error);
    },
  });
  return { mutate, isPending };
}
