import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse } from "@shared/types";

/** 회원 프로필 응답 */
export interface MemberProfile {
  memberId: number;
  nickname: string;
  preferredTags: {
    tagId: number;
    display: string;
  }[];
}

export const getMemberProfileApi = () =>
  api.get<ApiResponse<MemberProfile>>(END_POINTS.MEMBER_ME);
