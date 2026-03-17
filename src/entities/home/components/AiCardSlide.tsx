"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { MoodCardResponse } from "@entities/home/apis";
import { useHideMood } from "@entities/home/hooks";

interface AiCardSlideProps {
  aiCard: MoodCardResponse;
  onClose: () => void;
}

// imageId("1"~"8") → 카드 이미지 경로 매핑
const imagePathMap: Record<string, string> = {
  "1": "/images/feeling_sad.png",
  "2": "/images/feeling_fear.png",
  "3": "/images/feeling_joyful.png",
  "4": "/images/feeling_healing.png",
  "5": "/images/feeling_excitement.png",
  "6": "/images/feeling_knowledge.png",
  "7": "/images/feeling_stimulation.png",
  "8": "/images/feeling_dopamine.png",
};

// 캐러셀 뷰 그라데이션 배경색
const gradientMap: Record<number, string> = {
  1: "from-blue-950 via-blue-900 to-slate-900", // 슬픔
  2: "from-gray-950 via-purple-950 to-slate-900", // 공포
  3: "from-yellow-600 via-yellow-700 to-yellow-950", // 유쾌
  4: "from-green-950 via-teal-900 to-slate-900", // 힐링
  5: "from-pink-950 via-rose-900 to-slate-900", // 설렘
  6: "from-teal-900 via-cyan-900 to-slate-900", // 지식
  7: "from-red-900 via-orange-950 to-slate-900", // 자극
  8: "from-amber-900 via-yellow-900 to-slate-900", // 도파민
};

// 카드 뒷면 그라데이션 색
const cardBackGradientMap: Record<number, string> = {
  1: "from-blue-950 via-blue-950 to-slate-950", // 슬픔
  2: "from-gray-950 via-purple-950 to-gray-950", // 공포
  3: "from-yellow-700 via-yellow-800 to-yellow-950", // 유쾌
  4: "from-green-950 via-teal-950 to-slate-950", // 힐링
  5: "from-pink-950 via-rose-950 to-slate-950", // 설렘
  6: "from-teal-950 via-cyan-950 to-slate-950", // 지식
  7: "from-red-950 via-orange-950 to-gray-950", // 자극
  8: "from-amber-950 via-yellow-950 to-slate-950", // 도파민
};

export default function AiCardSlide({ aiCard, onClose }: AiCardSlideProps) {
  const imageIdNum = parseInt(aiCard.imageId);
  const gradient =
    gradientMap[imageIdNum] ?? "from-gray-900 via-gray-800 to-slate-900";

  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const { hideMood, isLoading } = useHideMood();

  const handleClose = async () => {
    await hideMood(aiCard.refreshId);
    onClose();
  };

  // 한 바퀴 회전
  const handleCardClick = () => {
    if (spinning) return;
    setSpinning(true);
    setRotation(360);
  };

  return (
    <div
      className={`relative flex h-full w-full flex-col bg-linear-to-r ${gradient} rounded-xl px-8 py-6`}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        disabled={isLoading}
        className="text-ot-text absolute top-4 right-4 flex h-8 w-8 items-center justify-center transition-colors hover:text-gray-600 disabled:opacity-50"
        aria-label="닫기"
      >
        <X size={20} />
      </button>

      {/* 제목 */}
      <p className="text-ot-text mb-4 text-2xl font-bold">
        현재 나의 감정 상태는?
      </p>

      {/* 중단: 카드(좌) + 말풍선+포스터(우) */}
      <div className="flex flex-1 items-center gap-8">
        {/* 왼쪽) 감정 카드 이미지 */}
        <div
          onClick={handleCardClick}
          className="shrink-0 cursor-pointer"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: rotation }}
            transition={{
              duration: rotation === 0 ? 0 : 0.8,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => {
              setSpinning(false);
              setRotation(0);
            }}
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
              width: 160,
              height: 220,
            }}
          >
            {/* 카드 앞면 */}
            <div style={{ backfaceVisibility: "hidden" }}>
              <Image
                src={imagePathMap[aiCard.imageId] ?? "/images/feeling_sad.png"}
                alt="감정 카드"
                width={160}
                height={220}
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* 카드 뒷면 (그라데이션 색) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <div
                className={`h-55 w-40 rounded-none bg-linear-to-b ${cardBackGradientMap[imageIdNum] ?? "from-gray-950 via-gray-900 to-slate-950"}`}
              />
            </div>
          </motion.div>
        </div>

        {/* 오른쪽) 말풍선 + 포스터 3개 */}
        <div className="flex flex-1 flex-col items-center gap-5">
          {/* 말풍선 */}
          <div className="relative rounded-xl bg-yellow-50 px-5 py-3 text-center">
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 border-8 border-transparent border-r-yellow-50" />
            <p className="text-sm font-semibold text-gray-800">
              &quot;분위기 전환으로 딱 좋은 작품들이에요!&quot;
            </p>
          </div>

          {/* 포스터 3개 */}
          <div className="flex gap-4">
            {aiCard.recommendedMediaList.slice(0, 3).map((media) => (
              <div key={media.mediaId} className="group shrink-0 cursor-pointer">
                <div className="relative h-50 w-37.5 overflow-hidden rounded-lg">
                  <Image
                    src={media.posterUrl}
                    alt="추천 콘텐츠"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단: 해시태그 + 자막 + 마무리 문구 */}
      <div className="mt-4 flex flex-col gap-2">
        {/* 해시태그 배지 */}
        <div className="flex gap-2">
          {aiCard.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/20 px-3 py-1 text-sm text-ot-text"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-ot-text text-sm">{aiCard.subtitle}</p>

        <p className="text-ot-text text-center text-sm">
          지금 기분에 맞는 콘텐츠로 마음을 채워보세요 💗
        </p>
      </div>
    </div>
  );
}
