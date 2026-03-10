"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useSeriesEpisodeList } from "@entities/video-contents/hooks";
import { useInfiniteScroll } from "@shared/hooks";

interface SeriesSideSectionProps {
  seriesMediaId: number;
}

export default function SeriesSideSection({
  seriesMediaId,
}: SeriesSideSectionProps) {
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
      <div className="flex h-[80vh] flex-col overflow-y-auto rounded-lg px-5 py-4">
        <p className="border-b pb-3 text-2xl font-bold">에피소드</p>
        {episodes.map((ep) => (
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
              <p className="text-left text-xl font-semibold">{ep.title}</p>
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
      </div>
    </div>
  );
}
