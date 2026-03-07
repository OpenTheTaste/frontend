import { api } from "@/shared/api";

export const postLikes = async (mediaId: number) => {
  await api.post("/likes", { mediaId });
};
