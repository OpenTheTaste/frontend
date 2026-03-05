import { api } from "@shared/api/apiClient";
import { ApiResponse } from "@/shared/types";
import { MemberProfile } from "@/entities/profile/api";

export interface UpdateMemberRequest {
  nickname: string;
  tagIds: number[];
}

export const editProfileApi = {
  updateMemberProfile: (body: UpdateMemberRequest) => api.patch<MemberProfile>("/member/me", body),
};
