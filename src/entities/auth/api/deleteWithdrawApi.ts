import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const deleteWithdrawApi = async () => {
  await api.delete(END_POINTS.MEMBER_ME);
};
