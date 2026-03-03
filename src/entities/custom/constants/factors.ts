export type Factor = "대중성" | "몰입도" | "마니아" | "최신성" | "숏폼 트렌드";

export const FACTORS: Factor[] = ["대중성", "몰입도", "마니아", "최신성", "숏폼 트렌드"];

export const INITIAL_VALUES: Record<Factor, number> = {
  대중성: 0,
  몰입도: 0,
  마니아: 0,
  최신성: 0,
  "숏폼 트렌드": 0,
};

export const GENRES = ["인기작 위주", "숨은 명작", "초기화"];

export const GUIDE_ITEMS: { key: Factor; en: string; desc: string }[] = [
  { key: "대중성", en: "View Count", desc: "많은 유저가 선택한 인기 작품을 우선으로 추천합니다." },
  {
    key: "몰입도",
    en: "Watch Time",
    desc: "한 번 시작하면 멈출 수 없는 시청 시간이 긴 작품 위주로 구성합니다.",
  },
  {
    key: "마니아",
    en: "Likes",
    desc: "대중적인 인기보다 높은 좋아요와 북마크 비율을 기록한 숨은 명작을 찾아줍니다.",
  },
  {
    key: "최신성",
    en: "Recency",
    desc: "지금 막 올라온 따끈따끈한 신규 콘텐츠를 빠르게 만나볼 수 있습니다.",
  },
  {
    key: "숏폼 트렌드",
    en: "Short-form Hot",
    desc: "현재 O+T 숏폼에서 가장 뜨거운 반응을 얻고 있는 화제의 작품을 추천합니다.",
  },
];

export const MOCK_PREVIEWS = [
  { id: 1, title: "파친코", genre: "드라마", thumbnail: "/images/recommendcontent_img.png" },
  { id: 2, title: "오징어 게임", genre: "드라마", thumbnail: "/images/recommendcontent_img.png" },
  { id: 3, title: "기생충", genre: "영화", thumbnail: "/images/recommendcontent_img.png" },
];
