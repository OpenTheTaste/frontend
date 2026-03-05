import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkDeleteApi } from "@entities/bookmark/api";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (mediaId: number) => bookmarkDeleteApi.postBookmarkDelete({ mediaId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkContents"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkShortForms"] });
    },
    onError: (err) => {
      console.error("북마크 삭제 실패:", err);
    },
  });
  return { mutate, isPending };
}
