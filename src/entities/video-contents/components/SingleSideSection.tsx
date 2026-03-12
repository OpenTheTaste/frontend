"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { ReviewSection } from "@entities/video-contents/components";
import {
  parsePlaylistSource,
  usePlaylist,
} from "@entities/video-contents/hooks";
import { useInfiniteScroll } from "@shared/hooks";
import { useMediaLink } from "@shared/hooks/useMediaLink";
import { PlaylistItem, PlaylistParams } from "@shared/types";

interface SingleSideSectionProps {
  mediaId: number;
  playlistParams?: PlaylistParams;
  commentId?: number;
}

export default function SingleSideSection({
  mediaId,
  playlistParams,
  commentId,
}: SingleSideSectionProps) {
  const [isExpandAllReviews, setIsExpandAllReviews] = useState<boolean>(false);

  const source = parsePlaylistSource(
    new URLSearchParams({
      ...(playlistParams?.playlist && { playlist: playlistParams.playlist }),
      ...(playlistParams?.tagId && { tagId: playlistParams.tagId }),
      ...(playlistParams?.index && { index: playlistParams.index }),
      ...(playlistParams?.query && { query: playlistParams.query }),
    }),
  );

  const { items, fetchNextPage, hasNextPage, isFetchingNextPage } = usePlaylist(
    source,
    mediaId,
  );
  const { observerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const { getMediaHref } = useMediaLink();

  return (
    <div className="w-full max-w-134 shrink-0">
      <ReviewSection
        isExpandAllReviews={isExpandAllReviews}
        setIsExpandAllReviews={setIsExpandAllReviews}
        mediaId={mediaId}
        commentId={commentId}
      />

      {!isExpandAllReviews && (
        <div className="flex h-[45vh] flex-col rounded-lg px-5 py-4">
          <p className="text-ot-text border-ot-gray-700 border-b pb-3 text-2xl font-bold">
            다음 재생목록
          </p>
          <div className="flex-1 overflow-y-auto">
            {items.map((item: PlaylistItem) => (
              <Link
                key={item.mediaId}
                href={getMediaHref(item.mediaId, item.mediaType, source)}
              >
                <button className="text-ot-text hover:bg-ot-gray-900 flex w-full items-center gap-6 p-4 transition">
                  <div className="bg-ot-gray-800 relative aspect-4/3 w-full max-w-25 shrink-0 overflow-hidden rounded-lg">
                    {item.thumbnailUrl && (
                      <Image
                        src={item.thumbnailUrl}
                        fill
                        className="object-cover"
                        alt={item.title}
                      />
                    )}
                  </div>
                  <p className="text-xl font-semibold">{item.title}</p>
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
      )}
    </div>
  );
}
