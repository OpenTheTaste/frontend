import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export const postLogoutApi = async () => {
  await api.post(END_POINTS.AUTH_LOGOUT);
};
