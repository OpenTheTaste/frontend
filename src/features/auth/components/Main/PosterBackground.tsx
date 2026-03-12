"use client";

import Image from "next/image";

const posters = Array.from({ length: 18 }, (_, i) => `/images/poster${i + 1}.jpg`);

// 3줄로 나누기 (각 줄 6개)
const row1 = posters.slice(0, 6);
const row2 = posters.slice(6, 12);
const row3 = posters.slice(12, 18);

export function PosterBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden mix-blend-lighten">
      <div className="absolute inset-0 flex flex-col gap-4 -rotate-12 scale-125 origin-center">
        {/* 행1 */}
        <div className="flex gap-4">
          {[...row1, ...row1].map((poster, index) => (
            <div
              key={`row1-${index}`}
              className="relative w-40 h-60 shrink-0 rounded-lg overflow-hidden"
            >
              <Image
                src={poster}
                alt=""
                fill
                className="object-cover opacity-80"
                sizes="320px"
              />
            </div>
          ))}
        </div>

        {/* 행2 */}
        <div className="flex gap-4 -ml-20">
          {[...row2, ...row2].map((poster, index) => (
            <div
              key={`row2-${index}`}
              className="relative w-40 h-60 shrink-0 rounded-lg overflow-hidden"
            >
              <Image
                src={poster}
                alt=""
                fill
                className="object-cover opacity-20"
                sizes="320px"
              />
            </div>
          ))}
        </div>

        {/* 행3 */}
        <div className="flex gap-4">
          {[...row3, ...row3].map((poster, index) => (
            <div
              key={`row3-${index}`}
              className="relative w-40 h-60 shrink-0 rounded-lg overflow-hidden"
            >
              <Image
                src={poster}
                alt=""
                fill
                className="object-cover opacity-20"
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 어두운 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-linear-to-b from-ot-background/30 via-ot-background/40 to-ot-background/80" />
      <div className="absolute inset-0 bg-linear-to-r from-ot-background/70 via-transparent to-ot-background/20" />
    </div>
  );
}
