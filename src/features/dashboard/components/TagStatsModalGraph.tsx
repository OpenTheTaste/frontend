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
  const { thisMonth, lastMonth } = monthlyStats;
  const isDarkPinkThisMonth = thisMonth >= lastMonth;
  const isNewUser = lastMonth === 0; // 신규 사용자 or 전월 데이터 없을 때 씀

  return (
    <div className="w-full flex items-center justify-center p-6 max-w-sm">
      {/* 범례 묶음 */}
      <div className="flex flex-col gap-3 mt-10 mr-6 shrink-0">
        <div className="flex flex-col items-center">
          <span className="text-xs" style={{ color: "#FF6A87" }}>
            {isDarkPinkThisMonth ? "금월" : "전월"}
          </span>
          <div className="w-10 h-3 rounded-sm" style={{ backgroundColor: "#FF6A87" }} />
        </div>
        {!isNewUser && (
          <div className="flex flex-col items-center">
            <span className="text-xs" style={{ color: "#FFB2BD" }}>
              {isDarkPinkThisMonth ? "전월" : "금월"}
            </span>
            <div className="w-10 h-3 rounded-sm" style={{ backgroundColor: "#FFB2BD" }} />
          </div>
        )}
      </div>

      {/* 그래프 전체 묶음 */}
      <div className="relative flex-1 overflow-visible" style={{ aspectRatio: "652/380" }}>
        {/* 그래프 틀 */}
        <Image
          src="/images/graphframe.svg"
          alt={`${tagName} 시청 통계 그래프`}
          fill
          className="object-fill z-20"
          priority
        />
        {/* graphbar_darkpink.svg (더 많은거 그래프 바) */}
        <motion.div
          className="absolute"
          style={{
            bottom: "0.5%",
            left: "0.3%",
            width: "76.7%",
            height: "94.7%",
            transformOrigin: "left center",
          }}
          initial={{ scaleX: 0 }} // 처음 (찌그러짐)
          animate={{ scaleX: 1 }} // 애니메이션 효과 후
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image src="/images/graphbar_darkpink.svg" alt="금월 바" fill className="object-fill" />
        </motion.div>

        {/* graphbar_lightpink.svg (더 적은거 그래프 바) -> 전월 데이터 있을 때만 표시됨 */}
        {!isNewUser && (
          <motion.div
            className="absolute z-10"
            style={{
              bottom: "0.5%",
              left: "0.3%",
              width: "95.1%",
              height: "52.6%",
              transformOrigin: "left center",
            }}
            initial={{ scaleX: 0 }} // 처음 (찌그러짐)
            animate={{ scaleX: 1 }} // 애니메이션 효과 후
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src="/images/graphbar_lightpink.svg"
              alt="전월 바"
              fill
              className="object-fill"
            />
          </motion.div>
        )}

        {/* 그래프 바 별 횟수 표시 묶음 */}
        {/* darkpink 횟수 (더 많은 거) */}
        <motion.span
          className="absolute z-30 text-xs whitespace-nowrap"
          style={{ color: "#FF6A87", top: "2%", left: "77%" }}
          initial={{ opacity: 0 }} // 처음 (찌그러짐)
          animate={{ opacity: 1 }} // 애니메이션 효과 후
          transition={{ delay: 0.7 }}
        >
          {isDarkPinkThisMonth ? thisMonth : lastMonth}회
        </motion.span>

        {/* lightpink 횟수 (더 적은 거) - 이거도 전월 데이터 있을 때만 표시됨 */}
        {!isNewUser && (
          <motion.span
            className="absolute z-30 text-xs whitespace-nowrap"
            style={{ color: "#FFB2BD", top: "48%", left: "96%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {isDarkPinkThisMonth ? lastMonth : thisMonth}회
          </motion.span>
        )}
      </div>
    </div>
  );
}
