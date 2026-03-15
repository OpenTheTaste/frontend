"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { AiCardItem } from "@shared/mocks/mockAiCardList";

interface AiCardSlideProps {
  aiCard: AiCardItem;
  onClose: () => void;
}

// 캐러셀 뷰 그라데이션 배경색
const gradientMap: Record<number, string> = {
  1: "from-blue-950 via-blue-900 to-slate-900", // 슬픔
  2: "from-gray-950 via-purple-950 to-slate-900", // 공포
  3: "from-yellow-900 via-orange-900 to-slate-900", // 유쾌
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
  3: "from-yellow-950 via-orange-950 to-slate-950", // 유쾌
  4: "from-green-950 via-teal-950 to-slate-950", // 힐링
  5: "from-pink-950 via-rose-950 to-slate-950", // 설렘
  6: "from-teal-950 via-cyan-950 to-slate-950", // 지식
  7: "from-red-950 via-orange-950 to-gray-950", // 자극
  8: "from-amber-950 via-yellow-950 to-slate-950", // 도파민
};

export default function AiCardSlide({ aiCard, onClose }: AiCardSlideProps) {
  const gradient =
    gradientMap[aiCard.imageId] ?? "from-gray-900 via-gray-800 to-slate-900";

  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);

  // 한 바퀴 회전
  const handleCardClick = () => {
    if (spinning) return;
    setSpinning(true);
    setRotation(360);
  };

  return (
    <div
      className={`relative flex h-full w-full items-center bg-linear-to-r ${gradient} rounded-xl`}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="text-ot-text absolute top-4 right-4 flex h-8 w-8 items-center justify-center transition-colors hover:text-gray-600"
        aria-label="닫기"
      >
        <X size={20} />
      </button>

      {/* 왼쪽) 내 감정 상태는? 텍스트 + 감정 카드 이미지 */}
      <div className="flex shrink-0 flex-col items-center justify-center gap-5 px-30 pb-6">
        <p className="text-ot-text text-2xl font-bold whitespace-nowrap">
          현재 나의 감정 상태는?
        </p>
        <div
          onClick={handleCardClick}
          className="cursor-pointer"
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
                src={aiCard.imagePath}
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
                className={`h-55 w-40 rounded-none bg-linear-to-b ${cardBackGradientMap[aiCard.imageId]}`}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 세로 구분선 */}
      <div className="bg-ot-text ml-6 h-56 w-px shrink" />

      {/* 오른쪽) 포스터 이미지 3개 + 안내 메시지 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-ot-text text-center text-xl font-semibold">
          &quot;분위기 전환으로 딱 좋은 작품들이에요!&quot;
        </p>
        <div className="flex gap-5">
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
        <p className="text-ot-text font-regular text-center">
          {aiCard.subtitle}
        </p>
      </div>
    </div>
  );
}
