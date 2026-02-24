"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TagStatsModalGraphProps {
  tagName: string;
  monthlyStats: {
    thisMonth: number;
    lastMonth: number;
  };
}

export default function TagStatsModalGraph({ tagName, monthlyStats }: TagStatsModalGraphProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full h-45">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} // 시작 상태: 투명하고 90% 크기
          animate={{ opacity: 1, scale: 1 }} // 종료 상태: 선명해지고 100% 크기
          transition={{ duration: 0.5, ease: "backOut" }} // 살짝 튕기는 듯한 부드러운 효과
          className="relative w-full h-full"
        >
          <Image
            src="/images/tagstatsmodal_graph.svg"
            alt={`${tagName} 시청 통계 그래프`}
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
