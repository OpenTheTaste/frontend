import { Content, Recommendation } from "@/types/contents";

// Mock 콘텐츠 데이터
export const mockContents: Record<number, Content> = {
  1: {
    type: "single",
    id: 1,
    title: "다만 악에서 구하소서",
    description:
      "태국에서 충격적인 납치사건이 발생하고 마지막 청부살인 미션을 끝낸 암살자 인남(황정민)은 그것이 자신과 관계된 것임을 알게 된다. 인남은 곧바로 태국으로 향하고, 조력자 유이(박정민)를 만나 사건을 쫓기 시작한다. 한편, 자신의 형제가 인남에게 암살당한 것을 알게 된 레이(이정재)....",
    cast: "이정재, 황정민, 박정민, 박소이",
    categories: ["영화"],
    tags: ["액션", "스릴러"],
    thumbnail: "",
  },
  2: {
    type: "series",
    id: 2,
    title: "더 글로리 시즌 1",
    description:
      "고등학교 시절 또래들에게 폭력을 당해 학교를 그만둔 문동은. 영혼까지 짓밟힌 그날의 기억을 안고, 생을 건 복수를 준비한다.",
    cast: "송혜교, 이도현, 임지연, 염혜란",
    categories: ["드라마"],
    tags: ["로맨스", "스릴러", "법정"],
    thumbnail: "",
    lastWatchedEpisode: null,
    episodes: [
      {
        id: 201,
        episodeNumber: 1,
        title: '1화 "복수를 꿈꾸며"',
        thumbnail: "",
        description:
          "문동은은 과거의 상처를 안고 치밀한 복수를 계획한다. 가해자들의 삶 속으로 조용히 스며든다. 초등학교 교사가 된 그녀는 박연진의 딸이 다니는 학교에 부임하며 복수의 첫 발을 내딛는다.",
        cast: "송혜교, 이도현, 임지연",
      },
      {
        id: 202,
        episodeNumber: 2,
        title: '2화 "계획의 시작"',
        thumbnail: "",
        description:
          "복수의 첫 번째 단계가 시작된다. 문동은은 초등학교 교사가 되어 박연진의 딸 앞에 나타난다.",
        cast: "송혜교, 이도현, 임지연",
      },
      {
        id: 203,
        episodeNumber: 3,
        title: '3화 "첫 번째 타겟"',
        thumbnail: "",
        description: "과거의 진실이 하나씩 드러나기 시작한다.",
        cast: "송혜교, 이도현, 임지연",
      },
      {
        id: 204,
        episodeNumber: 4,
        title: '4화 "과거의 기억"',
        thumbnail: "",
        description: "문동은의 고통스러운 과거가 밝혀진다.",
        cast: "송혜교, 이도현, 임지연",
      },
      {
        id: 205,
        episodeNumber: 5,
        title: '5화 "균열"',
        thumbnail: "",
        description: "가해자들 사이에 균열이 생기기 시작한다.",
        cast: "송혜교, 이도현, 임지연",
      },
      {
        id: 206,
        episodeNumber: 6,
        title: '6화 "종착지"',
        thumbnail: "",
        description: "복수는 예상치 못한 방향으로 흘러간다.",
        cast: "송혜교, 이도현, 임지연",
      },
    ],
  },
  3: {
    type: "single",
    id: 3,
    title: "서울의 봄",
    description:
      "1979년 12월 12일, 대한민국의 운명이 바뀐 9시간의 이야기. 군사반란을 일으킨 신군부와 이를 막으려는 수도경비사령관의 대립을 그린다.",
    cast: "황정민, 정우성, 이성민, 박해준",
    categories: ["영화"],
    tags: ["드라마", "역사", "정치"],
    thumbnail: "",
  },
};

export const mockRecommendations: Recommendation[] = [
  { id: 1, thumbnail: "", title: "다만 악에서 구하소서" },
  { id: 2, thumbnail: "", title: "더 글로리 시즌 1" },
  { id: 3, thumbnail: "", title: "서울의 봄" },
  { id: 4, thumbnail: "", title: "더 글로리" },
  { id: 5, thumbnail: "", title: "더 글로리" },
  { id: 6, thumbnail: "", title: "더 글로리" },
  { id: 7, thumbnail: "", title: "더 글로리" },
];

// 헬퍼 함수
export const getContentById = (id: number): Content | null => {
  return mockContents[id] || null;
};
