"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ReviewSection } from "@entities/video-contents/components";
import { useSeriesEpisodeList } from "@entities/video-contents/hooks";

interface EpisodeSideSectionProps {
  seriesMediaId: number;
  currentEpisodeId: number;
}

export default function EpisodeSideSection({
  seriesMediaId,
  currentEpisodeId,
}: EpisodeSideSectionProps) {
  const [isExpandAllReviews, setIsExpandAllReviews] = useState<boolean>(false);
  const {
    data: episodesData,
    isLoading,
    isError,
  } = useSeriesEpisodeList(seriesMediaId);
  const otherEpisodes =
    episodesData?.dataList.filter((ep) => ep.id !== currentEpisodeId) ?? [];

  if (isLoading)
    return <div className="w-full max-w-134 shrink-0">로딩중...</div>;
  if (isError)
    return (
      <div className="w-full max-w-134 shrink-0">
        에피소드를 불러올 수 없습니다.
      </div>
    );

  return (
    <div className="w-full max-w-134 shrink-0">
      <ReviewSection
        isExpandAllReviews={isExpandAllReviews}
        setIsExpandAllReviews={setIsExpandAllReviews}
        mediaId={currentEpisodeId}
      />

      {!isExpandAllReviews && (
        <div className="flex h-[45vh] flex-1 flex-col rounded-lg px-5 py-4">
          <p className="text-ot-text border-ot-gray-700 border-b pb-3 text-2xl font-bold">
            다른 에피소드
          </p>
          <div className="overflow-y-auto">
            {otherEpisodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/contents/${seriesMediaId}/episode/${ep.id}?type=SERIES`}
              >
                <button className="text-ot-text hover:bg-ot-gray-900 flex w-full items-center gap-6 p-4 transition">
                  <div className="bg-ot-gray-800 relative aspect-4/3 w-full max-w-25 shrink-0 overflow-hidden rounded-lg">
                    {ep.thumbnailUrl && (
                      <Image
                        src={ep.thumbnailUrl}
                        fill
                        className="object-cover"
                        alt={ep.title}
                      />
                    )}
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
