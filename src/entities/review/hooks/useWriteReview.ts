import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WriteReviewRequest, postReviewApi } from "@entities/review/api";

export const useWriteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WriteReviewRequest) => postReviewApi(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["review", "list"] }),
  });
};
