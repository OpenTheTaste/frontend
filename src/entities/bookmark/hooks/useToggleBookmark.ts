import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "@entities/bookmark/api";

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (mediaId: number) => toggleBookmark({ mediaId }),
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
