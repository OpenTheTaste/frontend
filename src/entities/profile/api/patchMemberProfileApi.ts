import { MemberProfile } from "@entities/profile/api";
import { api } from "@shared/api";

export interface UpdateMemberRequest {
  nickname: string;
  tagIds: number[];
}

export interface EditProfileParams {
  nickname: string;
  tagIds: number[];
}

export const patchMemberProfileApi = (body: UpdateMemberRequest) =>
  api.patch<MemberProfile>("/member/me", body);
