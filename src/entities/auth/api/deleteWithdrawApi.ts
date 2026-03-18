import { api } from "@shared/api";

export const deleteWithdrawApi = async () => {
  await api.delete("/member/me");
};
