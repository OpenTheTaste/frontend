import { api } from "@shared/api";

export const patchMoodHide = async (refreshId: number) => { 
    await api.patch(`/mood-refresh/${refreshId}/hide`, { refreshId });
}