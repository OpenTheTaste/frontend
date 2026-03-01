export interface ReviewItem {
  id: number;
  userId: string;
  content: string;
  date: string;
  image: string;
}

export const mockReviews: ReviewItem[] = [
  {
    id: 1,
    userId: "user_kim",
    content:
      "댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다댓글입니다장문댓글입니다 장문댓글입니다 장문댓글입니다",
    date: "2026.02.07. 20:24",
    image: "/images/reviews_img.png",
  },
  {
    id: 2,
    userId: "lee_star",
    content: "영화의 몰입감이 정말 엄청나네요. 배우들의 연기도 일품이고 연출이 대박입니다.",
    date: "2026.02.07. 21:10",
    image: "/images/reviews_img.png",
  },
  {
    id: 3,
    userId: "park_cinema",
    content: "스토리가 조금 아쉽지만 영상미 하나는 끝내줍니다. 꼭 영화관에서 봐야 할 영화!",
    date: "2026.02.08. 10:05",
    image: "/images/reviews_img.png",
  },
  {
    id: 4,
    userId: "user_kim",
    content: "간만에 보는 수작입니다. 친구들에게도 추천해주고 싶을 정도예요.",
    date: "2026.02.08. 14:30",
    image: "/images/reviews_img.png",
  },
  {
    id: 5,
    userId: "lee_star",
    content: "초반부는 지루했는데 후반부 몰아치는 액션이 압권이네요. 재밌게 봤습니다.",
    date: "2026.02.08. 19:15",
    image: "/images/reviews_img.png",
  },
  {
    id: 6,
    userId: "park_cinema",
    content: "음악이 너무 좋아서 영화 끝나고도 계속 귓가에 맴도네요. OST 발매 언제 하나요?",
    date: "2026.02.09. 11:00",
    image: "/images/reviews_img.png",
  },
  {
    id: 7,
    userId: "user_kim",
    content: "원작보다 나은 속편은 없다더니 이건 예외네요. 전작보다 훨씬 깊이 있습니다.",
    date: "2026.02.09. 15:45",
    image: "/images/reviews_img.png",
  },
  {
    id: 8,
    userId: "lee_star",
    content: "기대 안 하고 봤는데 인생 영화 등극했습니다. 눈물 콧물 다 뺐어요.",
    date: "2026.02.09. 22:20",
    image: "/images/reviews_img.png",
  },
  {
    id: 9,
    userId: "park_cinema",
    content: "반전의 반전! 끝날 때까지 긴장을 늦출 수 없었습니다. 시나리오가 탄탄하네요.",
    date: "2026.02.10. 09:30",
    image: "/images/reviews_img.png",
  },
  {
    id: 10,
    userId: "user_kim",
    content: "마지막 장면이 잊혀지지 않네요. 여운이 길게 남는 영화입니다.",
    date: "2026.02.10. 13:12",
    image: "/images/reviews_img.png",
  },
];
