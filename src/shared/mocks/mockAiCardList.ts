// src/shared/mocks/mockAiCardList.ts
import { MediaType } from '../types/mediaType';

export interface RecommendedMedia {
  mediaId: number;
  posterUrl: string;
  mediaType: MediaType;
}

export interface AiCardItem {
  refreshId: number;
  imageId: number;
  imagePath: string;
  subtitle: string;
  recommendedMediaList: RecommendedMedia[];
}

export const mockAiCardList: AiCardItem[] = [
  {
    refreshId: 1,
    imageId: 1,
    imagePath: '/images/feeling_sad.png',
    subtitle: '요즘 마음이 무거우셨군요. 잠시 위로가 될 작품들을 모아봤어요.',
    recommendedMediaList: [
      { mediaId: 101, posterUrl: '/images/poster1.png', mediaType: 'CONTENTS' },
      { mediaId: 102, posterUrl: '/images/poster2.png', mediaType: 'SERIES' },
      { mediaId: 103, posterUrl: '/images/poster3.png', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 2,
    imageId: 2,
    imagePath: '/images/feeling_fear.png',
    subtitle: '긴장감이 필요하신가요? 스릴 넘치는 작품들을 골라봤어요.',
    recommendedMediaList: [
      { mediaId: 201, posterUrl: '/images/poster4.png', mediaType: 'SERIES' },
      { mediaId: 202, posterUrl: '/images/poster5.png', mediaType: 'CONTENTS' },
      { mediaId: 203, posterUrl: '/images/poster6.png', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 3,
    imageId: 3,
    imagePath: '/images/feeling_joyful.png',
    subtitle: '유쾌한 하루를 보내고 싶으신가요? 웃음이 넘치는 작품들이에요.',
    recommendedMediaList: [
      { mediaId: 301, posterUrl: '/images/poster7.png', mediaType: 'CONTENTS' },
      { mediaId: 302, posterUrl: '/images/poster8.png', mediaType: 'CONTENTS' },
      { mediaId: 303, posterUrl: '/images/poster9.png', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 4,
    imageId: 4,
    imagePath: '/images/feeling_healing.png',
    subtitle: '지친 하루, 마음을 달래줄 따뜻한 작품들을 준비했어요.',
    recommendedMediaList: [
      { mediaId: 401, posterUrl: '/images/poster10.png', mediaType: 'SERIES' },
      { mediaId: 402, posterUrl: '/images/poster11.png', mediaType: 'CONTENTS' },
      { mediaId: 403, posterUrl: '/images/poster12.png', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 5,
    imageId: 5,
    imagePath: '/images/feeling_excitement.png',
    subtitle: '두근거리는 설렘을 함께할 로맨틱한 작품들이에요.',
    recommendedMediaList: [
      { mediaId: 501, posterUrl: '/images/poster13.png', mediaType: 'CONTENTS' },
      { mediaId: 502, posterUrl: '/images/poster14.png', mediaType: 'SERIES' },
      { mediaId: 503, posterUrl: '/images/poster15.png', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 6,
    imageId: 6,
    imagePath: '/images/feeling_knowledge.png',
    subtitle: '새로운 지식이 궁금하신가요? 생각을 넓혀줄 작품들이에요.',
    recommendedMediaList: [
      { mediaId: 601, posterUrl: '/images/poster16.png', mediaType: 'CONTENTS' },
      { mediaId: 602, posterUrl: '/images/poster17.png', mediaType: 'CONTENTS' },
      { mediaId: 603, posterUrl: '/images/poster18.png', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 7,
    imageId: 7,
    imagePath: '/images/feeling_stimulation.png',
    subtitle: '강렬한 자극이 필요하신가요? 몰입감 있는 작품들을 골랐어요.',
    recommendedMediaList: [
      { mediaId: 701, posterUrl: '/images/poster_mock_1.png', mediaType: 'SERIES' },
      { mediaId: 702, posterUrl: '/images/poster_mock_2.png', mediaType: 'CONTENTS' },
      { mediaId: 703, posterUrl: '/images/poster_mock_3.png', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 8,
    imageId: 8,
    imagePath: '/images/feeling_dopamine.png',
    subtitle: '요즘 비슷한 분위기의 작품들만 연달아 보셨네요! 이번엔 완전히 새로운 짜릿함을 느껴보세요.',
    recommendedMediaList: [
      { mediaId: 801, posterUrl: '/images/poster_mock_1.png', mediaType: 'CONTENTS' },
      { mediaId: 802, posterUrl: '/images/poster_mock_2.png', mediaType: 'SERIES' },
      { mediaId: 803, posterUrl: '/images/poster_mock_3.png', mediaType: 'CONTENTS' },
    ],
  },
];

// 활성 카드 1건 (GET /mood-refresh/active Mock)
// null로 바꾸면 카드 미노출 상태 테스트 가능
export const mockActiveAiCard: AiCardItem | null = mockAiCardList[7];