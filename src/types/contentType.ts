// 콘텐츠 종류

export const CONTENT_TYPES = ["단편", "시리즈"] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];
