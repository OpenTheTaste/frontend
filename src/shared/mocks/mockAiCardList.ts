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
    // 슬픔 -> 유쾌/힐링으로 환기
    subtitle: '요즘 마음이 많이 무거우셨군요. 기분 전환이 될 유쾌하고 따뜻한 작품들을 준비했어요.',
    recommendedMediaList: [
      { mediaId: 101, posterUrl: '/images/poster1.jpg', mediaType: 'CONTENTS' },
      { mediaId: 102, posterUrl: '/images/poster2.jpg', mediaType: 'SERIES' },
      { mediaId: 103, posterUrl: '/images/poster3.jpg', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 2,
    imageId: 2,
    imagePath: '/images/feeling_fear.png',
    // 공포 -> 유쾌/힐링으로 환기
    subtitle: '긴장되고 불안한 하루였나요? 마음이 편안해질 따뜻한 작품들을 골라봤어요.',
    recommendedMediaList: [
      { mediaId: 201, posterUrl: '/images/poster4.jpg', mediaType: 'SERIES' },
      { mediaId: 202, posterUrl: '/images/poster5.jpg', mediaType: 'CONTENTS' },
      { mediaId: 203, posterUrl: '/images/poster6.jpg', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 3,
    imageId: 3,
    imagePath: '/images/feeling_joyful.png',
    // 유쾌 -> 설렘 환기
    subtitle: '요즘 배꼽 빠지는 유쾌한 작품만 연달아 보셨네요! 지금은 심장 몽글몽글해지는 로맨스로 감성을 충전해보는 건 어떨까요?',
    recommendedMediaList: [
      { mediaId: 301, posterUrl: '/images/poster7.jpg', mediaType: 'CONTENTS' },
      { mediaId: 302, posterUrl: '/images/poster8.jpg', mediaType: 'CONTENTS' },
      { mediaId: 303, posterUrl: '/images/poster9.jpg', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 4,
    imageId: 4,
    imagePath: '/images/feeling_healing.png',
    // 힐링 -> 도파민/자극으로 환기
    subtitle: '너무 잔잔한 것들만 보셨네요. 이번엔 짜릿하고 강렬한 작품으로 활력을 충전해보세요!',
    recommendedMediaList: [
      { mediaId: 401, posterUrl: '/images/poster10.jpg', mediaType: 'SERIES' },
      { mediaId: 402, posterUrl: '/images/poster11.jpg', mediaType: 'CONTENTS' },
      { mediaId: 403, posterUrl: '/images/poster12.jpg', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 5,
    imageId: 5,
    imagePath: '/images/feeling_excitement.png',
    // 설렘 -> 공포 환기
    subtitle: '설레는 로맨스에 푹 빠져 계셨군요! 이번엔 심장이 쫄깃해지는 스릴 넘치는 작품들로 색다른 두근거림을 느껴보세요.',
    recommendedMediaList: [
      { mediaId: 501, posterUrl: '/images/poster13.jpg', mediaType: 'CONTENTS' },
      { mediaId: 502, posterUrl: '/images/poster14.jpg', mediaType: 'SERIES' },
      { mediaId: 503, posterUrl: '/images/poster15.jpg', mediaType: 'CONTENTS' },
    ],
  },
  {
    refreshId: 6,
    imageId: 6,
    imagePath: '/images/feeling_knowledge.png',
    // 지식 -> 유쾌로 환기
    subtitle: '머리를 많이 쓰셨네요! 이번엔 아무 생각 없이 즐길 수 있는 가벼운 작품들을 추천해드려요.',
    recommendedMediaList: [
      { mediaId: 601, posterUrl: '/images/poster16.jpg', mediaType: 'CONTENTS' },
      { mediaId: 602, posterUrl: '/images/poster17.jpg', mediaType: 'CONTENTS' },
      { mediaId: 603, posterUrl: '/images/poster18.jpg', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 7,
    imageId: 7,
    imagePath: '/images/feeling_stimulation.png',
    // 자극 -> 힐링으로 환기
    subtitle: '강렬한 것들만 연달아 보셨네요. 잠깐 쉬어가며 따뜻하고 잔잔한 작품들은 어떠세요?',
    recommendedMediaList: [
      { mediaId: 701, posterUrl: '/images/poster1.jpg', mediaType: 'SERIES' },
      { mediaId: 702, posterUrl: '/images/poster2.jpg', mediaType: 'CONTENTS' },
      { mediaId: 703, posterUrl: '/images/poster3.jpg', mediaType: 'SERIES' },
    ],
  },
  {
    refreshId: 8,
    imageId: 8,
    imagePath: '/images/feeling_dopamine.png',
    subtitle: '요즘 비슷한 분위기의 작품들만 연달아 보셨네요! 이번엔 완전히 새로운 짜릿함을 느껴보세요.',
    recommendedMediaList: [
      { mediaId: 801, posterUrl: '/images/poster4.jpg', mediaType: 'CONTENTS' },
      { mediaId: 802, posterUrl: '/images/poster5.jpg', mediaType: 'SERIES' },
      { mediaId: 803, posterUrl: '/images/poster6.jpg', mediaType: 'CONTENTS' },
    ],
  },
];

// 활성 카드 1건 (GET /mood-refresh/active Mock)
// null로 바꾸면 카드 미노출 상태 테스트 가능
export const mockActiveAiCard: AiCardItem | null = mockAiCardList[4];