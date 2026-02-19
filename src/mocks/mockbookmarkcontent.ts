import { BookmarkItem } from "@/types/bookmark";

export const BookmarkContentsMockData: BookmarkItem[] = [
  {
    id: "contents-1",
    title: "북마크 작품 제목 1",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-2",
    title: "설명글이 긴 작품 제목 2 (말줄임 테스트)",
    description:
      "이 데이터는 설명글이 2줄 이상 넘어가는지 확인하기 위한 테스트용입니다. 1720px 너비에서 텍스트가 오른쪽 삭제 버튼 앞까지 가득 차야 하며, 범위를 초과하면 자동으로 말줄임표(...)가 붙어야 합니다. 줄 간격 140%가 적용되어 가독성이 확보되는지 확인해 보세요.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-3",
    title: "북마크 작품 제목 3",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-4",
    title: "북마크 작품 제목 4",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-5",
    title: "텍스트 영역 확장 테스트 제목 5 (말줄임 테스트)",
    description:
      "다섯 번째 데이터 역시 설명글이 매우 길게 작성되었습니다. 제목(36px Bold)과 설명(16px Regular) 텍스트가 이미지 우측 60px 지점부터 시작하여 오른쪽 끝까지 유연하게 확장되는지 확인하기 위한 용도입니다. line-clamp-2 속성이 두 줄에서 정확히 끊어주는지 테스트하세요.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-6",
    title: "북마크 작품 제목 6",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-7",
    title: "북마크 작품 제목 7",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-8",
    title: "범위 제한 및 말줄임 확인 제목 8 (말줄임 테스트)",
    description:
      "여덟 번째 긴 텍스트 데이터입니다. 320x240 이미지와 60px 간격을 두고 배치된 텍스트 영역이 전체 1720px 컨테이너 안에서 어떻게 균형을 잡는지 최종적으로 점검할 수 있습니다. 특히 이미지 상단에서 64px 내려온 지점부터 제목이 시작되는지 수치를 확인해 보세요.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-9",
    title: "북마크 작품 제목 9",
    description: "작품에 대한 짧은 설명글입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
  {
    id: "contents-10",
    title: "북마크 작품 제목 10",
    description: "마지막 열 번째 작품 설명입니다.",
    image: "/images/bookmarkcontent_img.png",
  },
];
