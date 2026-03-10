"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ReviewSection } from "@entities/video-contents/components";
import { useSeriesEpisodeList } from "@entities/video-contents/hooks";
import { useInfiniteScroll } from "@shared/hooks";

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
    episodes,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSeriesEpisodeList(seriesMediaId);

  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const otherEpisodes = episodes.filter(
    (ep) => ep.mediaId !== currentEpisodeId,
  );

  return (
    <div className="w-full max-w-134 shrink-0">
      <ReviewSection
        isExpandAllReviews={isExpandAllReviews}
        setIsExpandAllReviews={setIsExpandAllReviews}
        mediaId={currentEpisodeId}
      />

      {!isExpandAllReviews && (
        <div className="flex h-[45vh] flex-col rounded-lg px-5 py-4">
          <p className="text-ot-text border-ot-gray-700 border-b pb-3 text-2xl font-bold">
            다른 에피소드
          </p>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="py-4 text-center">로딩중...</div>
            ) : isError ? (
              <div className="py-4 text-center">
                에피소드를 불러올 수 없습니다.
              </div>
            ) : (
              <>
                {otherEpisodes.map((ep) => (
                  <Link
                    key={ep.mediaId}
                    href={`/contents/${seriesMediaId}/episode/${ep.mediaId}?type=SERIES`}
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
                <div ref={observerRef} className="flex h-2 justify-center">
                  {isFetchingNextPage && (
                    <Loader2
                      className="text-ot-placeholder mt-4 animate-spin"
                      size={20}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
