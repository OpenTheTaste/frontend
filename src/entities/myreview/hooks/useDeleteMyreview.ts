import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyReviewApi } from "@entities/myreview/api";

export function useDeleteMyreview() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (commentId: number) => deleteMyReviewApi(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myreviews"] });
      queryClient.invalidateQueries({ queryKey: ["review", "list"] });
    },
    onError: (err) => {
      console.error("댓글 삭제 실패:", err);
    },
  });
  return { mutate, isPending };
}
