export type ContentType = "콘텐츠" | "숏폼";

export interface AdminContent {
  id: number;
  thumbnail: string;
  title: string;
  duration: string;
  type: ContentType;
  isPublic: boolean;
  uploadDate: string;
}

export const mockAdminContents: AdminContent[] = [
  {
    id: 1,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "02:58:14",
    type: "콘텐츠",
    isPublic: true,
    uploadDate: "2026-02-08",
  },
  {
    id: 2,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "00:00:45",
    type: "숏폼",
    isPublic: false,
    uploadDate: "2026-02-08",
  },
  {
    id: 3,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "01:45:12",
    type: "콘텐츠",
    isPublic: false,
    uploadDate: "2026-02-08",
  },
  {
    id: 4,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "00:00:30",
    type: "숏폼",
    isPublic: true,
    uploadDate: "2026-02-08",
  },
  {
    id: 5,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "02:12:08",
    type: "콘텐츠",
    isPublic: true,
    uploadDate: "2026-02-08",
  },
  {
    id: 6,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "00:01:10",
    type: "숏폼",
    isPublic: false,
    uploadDate: "2026-02-08",
  },
  {
    id: 7,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "01:32:44",
    type: "콘텐츠",
    isPublic: true,
    uploadDate: "2026-02-08",
  },
  {
    id: 8,
    thumbnail: "/images/recent_img.png",
    title: "서울의 봄처럼 설레임 봄처럼 봄처럼 봄",
    duration: "00:00:55",
    type: "숏폼",
    isPublic: true,
    uploadDate: "2026-02-08",
  },
];
