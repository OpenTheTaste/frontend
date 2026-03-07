import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLikes } from "@entities/likes/api";

export function useLikes() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (mediaId: number) => postLikes(mediaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
    onError: (error) => {
      console.error("좋아요 실패", error);
    },
  });
  return { mutate, isPending };
}
