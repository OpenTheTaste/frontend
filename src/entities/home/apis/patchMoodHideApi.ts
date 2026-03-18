import { api } from "@shared/api";

export const patchMoodHideApi = async (refreshId: number) => {
  await api.patch(`/mood-refresh/${refreshId}/hide`, { refreshId });
};
