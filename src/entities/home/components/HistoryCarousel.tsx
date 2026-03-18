"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentCarousel } from "@entities/home/components";
import { useHistoryList } from "@entities/home/hooks";
import { ViewProgressBar } from "@shared/components";
import { useMediaLink } from "@shared/hooks";
import { useUserStore } from "@shared/store";
import { PlaylistItem } from "@shared/types";

export default function HistoryCarousel() {
  const { data } = useHistoryList({ page: 0, size: 20 });
  const nickname = useUserStore((state) => state.nickname);
  const items = data?.dataList ?? [];
  const { getMediaHref } = useMediaLink();

  if (!items.length) return null;

  return (
    <ContentCarousel
      title={`${nickname ?? ""}님이 시청하신 콘텐츠`}
      itemWidth={240}
      itemHeight={180}
      items={items}
      renderItem={(item: PlaylistItem) => (
        <Link
          href={getMediaHref(item.mediaId, item.mediaType, {
            type: "history",
          })}
          className="block h-full w-full"
        >
          <div className="bg-ot-gray-800 relative h-full w-full overflow-hidden rounded-lg">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-2">
              <p className="text-ot-text line-clamp-2 text-xs font-medium">
                {item.title}
              </p>
            </div>
            <div className="absolute right-0 bottom-0 left-0">
              <ViewProgressBar
                duration={item.duration}
                positionSec={item.positionSec}
              />
            </div>
          </div>
        </Link>
      )}
    />
  );
}
