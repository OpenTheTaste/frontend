import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WriteReviewRequest, writeReview } from "@entities/review/api";

export const useWriteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: WriteReviewRequest) => writeReview(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["review", "list"] }),
  });
};
