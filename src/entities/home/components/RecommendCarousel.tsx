"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ContentCarousel } from "@entities/home/components";
import { RecommendPlaylistItem } from "@entities/withdraw-recommends/api";
import { useWithdrawContents } from "@entities/withdraw-recommends/hooks";
import { useMediaLink } from "@shared/hooks";
import { useUserStore } from "@shared/store";

export default function RecommendCarousel() {
  const [page, setPage] = useState(0);
  const { data } = useWithdrawContents(
    { page, size: 20 },
    {
      placeholderData: (prev) => prev,
    },
  );
  const nickname = useUserStore((state) => state.nickname);
  const items = data?.dataList ?? [];
  const { getMediaHref } = useMediaLink();

  return (
    <ContentCarousel
      title={`${nickname ?? ""}님이 좋아하실만한 콘텐츠`}
      itemWidth={180}
      itemHeight={240}
      items={items}
      onRefresh={setPage}
      renderItem={(item: RecommendPlaylistItem) => (
        <Link
          href={getMediaHref(item.mediaId, item.mediaType, {
            type: "recommend",
          })}
          className="block h-full w-full"
        >
          <div className="bg-ot-gray-800 relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src={item.posterUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-2">
              <p className="text-ot-text line-clamp-2 text-xs font-medium">
                {item.title}
              </p>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
