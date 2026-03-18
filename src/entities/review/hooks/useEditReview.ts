import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditReviewRequest, patchEditReviewApi } from "@entities/review/api";

interface EditReviewParams extends EditReviewRequest {
  commentId: number;
}

export const useEditReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, ...body }: EditReviewParams) =>
      patchEditReviewApi(commentId, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["review", "list"] }),
  });
};
