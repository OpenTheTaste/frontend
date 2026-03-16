import { api } from "@shared/api";
import { MemberProfile } from "@/entities/profile/api";

export interface UpdateMemberRequest {
  nickname: string;
  tagIds: number[];
}

export interface EditProfileParams {
  nickname: string;
  tagIds: number[];
}

export const editProfileApi = {
  updateMemberProfile: (body: UpdateMemberRequest) =>
    api.patch<MemberProfile>("/member/me", body),
};
