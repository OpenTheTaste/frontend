"use client";

import Link from "next/link";
import { useState } from "react";
import { ReviewSection } from "@entities/video-contents/components";
import { Recommendation } from "@shared/types/video-contents/contents";

interface SingleSideSectionProps {
  recommendations: Recommendation[];
  mediaId: number;
}

export default function SingleSideSection({
  recommendations,
  mediaId,
}: SingleSideSectionProps) {
  const [isExpandAllReviews, setIsExpandAllReviews] = useState<boolean>(false);

  return (
    <div className="w-full max-w-134 shrink-0">
      <ReviewSection
        isExpandAllReviews={isExpandAllReviews}
        setIsExpandAllReviews={setIsExpandAllReviews}
        mediaId={mediaId}
      />

      {!isExpandAllReviews && (
        <div className="flex h-[45vh] flex-col rounded-lg px-5 py-4">
          <p className="text-ot-text border-ot-gray-700 border-b pb-3 text-2xl font-bold">
            다음 재생목록
          </p>
          <div className="overflow-y-auto">
            {recommendations.map((item) => (
              <Link key={item.id} href={`/contents/${item.id}`}>
                <button
                  key={item.id}
                  className="text-ot-text hover:bg-ot-gray-900 flex w-full items-center gap-6 p-4 transition"
                >
                  <div className="bg-ot-gray-800 aspect-4/3 w-full max-w-25 shrink-0 rounded-lg">
                    {/* <img src="/thumb.jpg" className="h-full w-full object-cover" alt="-ui" />  */}
                    {/* 썸네일 자리 4:3 */}
                    {/* {item.thumbnail} */}
                    가로 포스터
                  </div>
                  <p className="text-xl font-semibold">{item.title}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
