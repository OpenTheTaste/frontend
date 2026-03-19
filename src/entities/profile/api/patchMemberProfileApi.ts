import { MemberProfile } from "@entities/profile/api";
import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";

export interface UpdateMemberRequest {
  nickname: string;
  tagIds: number[];
}

export interface EditProfileParams {
  nickname: string;
  tagIds: number[];
}

export const patchMemberProfileApi = (body: UpdateMemberRequest) =>
  api.patch<MemberProfile>(END_POINTS.MEMBER_ME, body);
