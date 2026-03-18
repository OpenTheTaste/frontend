"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { MoodCardResponse } from "@entities/home/apis";
import { useHideMood } from "@entities/home/hooks";

interface AiCardSlideProps {
  aiCard: MoodCardResponse;
  onClose: () => void;
}

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

const gradientMap: Record<number, string> = {
  1: "from-blue-950 via-blue-900 to-slate-900",
  2: "from-gray-950 via-purple-950 to-slate-900",
  3: "from-yellow-600 via-yellow-700 to-yellow-950",
  4: "from-green-950 via-teal-900 to-slate-900",
  5: "from-pink-950 via-rose-900 to-slate-900",
  6: "from-teal-900 via-cyan-900 to-slate-900",
  7: "from-red-900 via-orange-950 to-slate-900",
  8: "from-amber-900 via-yellow-900 to-slate-900",
};

const cardBackGradientMap: Record<number, string> = {
  1: "from-blue-950 via-blue-950 to-slate-950",
  2: "from-gray-950 via-purple-950 to-gray-950",
  3: "from-yellow-700 via-yellow-800 to-yellow-950",
  4: "from-green-950 via-teal-950 to-slate-950",
  5: "from-pink-950 via-rose-950 to-slate-950",
  6: "from-teal-950 via-cyan-950 to-slate-950",
  7: "from-red-950 via-orange-950 to-gray-950",
  8: "from-amber-950 via-yellow-950 to-slate-950",
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

  const handleCardClick = () => {
    if (spinning) return;
    setSpinning(true);
    setRotation(360);
  };

  return (
    <div
      className={`relative flex h-full w-full flex-col bg-linear-to-r ${gradient} overflow-y-auto rounded-xl px-8 py-6`}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        disabled={isLoading}
        className="text-ot-text absolute top-4 right-4 flex h-8 w-8 items-center justify-center transition-colors hover:text-gray-400 disabled:opacity-50"
        aria-label="닫기"
      >
        <X size={20} />
      </button>

      {/* 제목 */}
      <p className="text-ot-text text-2xl font-bold">현재 나의 감정 상태는?</p>

      {/* 중단: 카드(좌) + 구분선 + 말풍선+포스터(우) */}
      <div className="flex flex-1 items-center justify-center gap-20">
        {/* 왼쪽) 감정 카드 이미지 */}
        <div
          onClick={handleCardClick}
          className="flex shrink-0 cursor-pointer flex-col items-center justify-center"
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
            <div style={{ backfaceVisibility: "hidden" }}>
              <Image
                src={imagePathMap[aiCard.imageId] ?? "/images/feeling_sad.png"}
                alt="감정 카드"
                width={160}
                height={220}
                className="object-contain drop-shadow-2xl"
              />
            </div>
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

        {/* 세로 구분선 */}
        <div className="h-60 w-px shrink-0 bg-white/20" />

        {/* 오른쪽) 말풍선 + 포스터 3개 */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-xl bg-yellow-50 px-5 py-3 text-center">
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 border-8 border-transparent border-r-yellow-50" />
            <p className="text-sm font-semibold text-gray-800">
              &quot;분위기 전환으로 딱 좋은 작품들이에요!&quot;
            </p>
          </div>

          <div className="flex gap-4">
            {aiCard.recommendedMediaList.slice(0, 3).map((media) => (
              <div
                key={media.mediaId}
                className="group shrink-0 cursor-pointer"
              >
                <div className="relative aspect-5/7 w-30 overflow-hidden rounded-lg">
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

          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap justify-center gap-2">
              {aiCard.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-ot-text rounded-full bg-white/20 px-3 py-1 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-ot-text text-sm">{aiCard.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
