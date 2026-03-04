import api from "@shared/api/apiClient";
import { ApiResponse } from "@/shared/types";

/** 회원 프로필 응답 */
export interface MemberProfile {
  memberId: number;
  nickname: string;
  preferredTags: {
    tagId: number;
    display: string;
  }[];
}

export const memberApi = {
  // MemberProfile 뒤에 [] 붙이는거 -> 목록 반환할 때? (= 여러 개 데이터 반환할 때)
  // 이건 조회만 하는거니까 hook 안써도 됨
  // getMemberProfile: () => api.get<ApiResponse<MemberProfile>>("/member/me"),
  getMemberProfile: () => api.get<MemberProfile>("/member/me"),
};
