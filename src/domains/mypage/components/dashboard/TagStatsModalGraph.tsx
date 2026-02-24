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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "backOut" }}
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
