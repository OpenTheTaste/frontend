export const END_POINTS = {
  // 카테고리
  CATEGORIES: "/categories",
  CATEGORIES_TAGS: (categoryId: number) => `/categories/${categoryId}/tags`,

  // 인증/인가
  AUTH_REISSUE: "/auth/reissue",
  AUTH_LOGOUT: "/auth/logout",

  // 마이페이지
  MEMBER_ME: "/member/me",
  MEMBER_ME_TAGS: "/member/me/tags",
  MEMBER_ME_ONBOARDING_SKIP: "/member/me/onboarding/skip",

  // 분위기 환기
  MOOD_REFRESH_ACTIVE: "/mood-refresh/active",
  MOOD_REFRESH_HIDE: (refreshId: number) => `/mood-refresh/${refreshId}/hide`,

  // 좋아요
  LIKES: "/likes",

  // 콘텐츠
  CONTENTS_DETAIL: (mediaId: number) => `/contents/${mediaId}`,

  // 댓글
  COMMENTS: "/comments",
  COMMENTS_DETAIL: (commentId: number) => `/comments/${commentId}`,
  COMMENTS_BY_MEDIA: (mediaId: number) => `/comments/${mediaId}/comments`,
  COMMENTS_ME: "/comments/me",

  // 레이더 차트
  RADAR: "/radar",
  RADAR_RECOMMEND: "/radar/recommend",
  RADAR_BATCH: "/radar/batch",

  // 검색
  SEARCH: "/search",

  // 북마크
  BOOKMARKS: "/bookmarks",
  BOOKMARKS_ME_SHORT_FORM: "/bookmarks/me/short-form",
  BOOKMARKS_ME_CONTENTS: "/bookmarks/me/contents",

  // 이어보기
  PLAYBACK: "/playback",

  // 시청 이력
  WATCH_HISTORY: "/watch-history",

  // 태그
  TAG_ME_RANKING: "/tag/me/ranking",
  TAG_ME_RANKING_DETAIL: (tagId: number) => `/tag/me/ranking/${tagId}`,

  // 플레이리스트
  PLAYLISTS_TRENDING: "/playlists/trending",
  PLAYLISTS_BY_TAG: (tagId: number) => `/playlists/tags/${tagId}`,
  PLAYLISTS_TAGS_TOP: "/playlists/tags/top",
  PLAYLISTS_SEARCH: "/playlists/search",
  PLAYLISTS_RECOMMEND: "/playlists/recommend",
  PLAYLISTS_HISTORY: "/playlists/history",
  PLAYLISTS_BOOKMARKS: "/playlists/bookmarks",

  // 숏폼
  SHORT_FORMS: "/short-forms",
  SHORT_FORMS_EVENTS: "/short-forms/events",
  SHORT_FORMS_CTA: "/short-forms/cta",

  // 시리즈
  SERIES_DETAIL: (mediaId: number) => `/series/${mediaId}`,
  SERIES_CONTENTS: (mediaId: number) => `/series/${mediaId}/contents`,
} as const;
