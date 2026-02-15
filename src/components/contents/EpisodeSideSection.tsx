"use client";

import Link from "next/link";
import ReviewContainer from "@/components/contents/ReviewSection";
import { useState } from "react";
import { Episode } from "@/types/contents";

interface EpisodeSideSectionProps {
  seriesId: number;
  otherEpisodes: Episode[];
}

export default function EpisodeSideSection({
  seriesId,
  otherEpisodes,
}: EpisodeSideSectionProps) {
  const [isExpandAllReviews, setIsExpandAllReviews] = useState<boolean>(false);

  return (
    <div className="w-full max-w-134 shrink-0">
      <ReviewContainer
        isExpandAllReviews={isExpandAllReviews}
        setIsExpandAllReviews={setIsExpandAllReviews}
      />

      {!isExpandAllReviews && (
        <div className="px-5 py-4 rounded-lg flex flex-col flex-1 h-[45vh]">
          <p className="text-2xl font-bold text-ot-text pb-3 border-b border-ot-gray-700">
            다른 에피소드
          </p>
          <div className="overflow-y-auto">
            {otherEpisodes.map((ep) => (
              <Link key={ep.id} href={`/contents/${seriesId}/episode/${ep.id}`}>
                <button className="w-full p-4 text-ot-text gap-6 flex items-center hover:bg-ot-gray-900 transition">
                  <div className="max-w-25 w-full aspect-4/3 rounded-lg bg-ot-gray-800 shrink-0">
                    {/* <img src="/thumb.jpg" className="h-full w-full object-cover" alt="" />  */}
                    {/* 썸네일 자리 4:3 */}
                    {/* {ep.thumbnail} */}
                    시리즈 가로 포스터
                  </div>
                  <p className="text-xl font-semibold">{ep.title}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
