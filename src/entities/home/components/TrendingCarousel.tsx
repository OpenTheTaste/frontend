"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentCarousel } from "@entities/home/components";
import { useTrendingList } from "@entities/home/hooks";
import { useMediaLink } from "@shared/hooks";
import { PlaylistItem } from "@shared/types";

export default function TrendingCarousel() {
  const { data } = useTrendingList({ page: 0, size: 20 });
  const items = data?.dataList ?? [];
  const { getMediaHref } = useMediaLink();

  return (
    <ContentCarousel
      title="실시간 인기 차트"
      itemWidth={180}
      itemHeight={240}
      items={items}
      renderItem={(item: PlaylistItem) => (
        <Link
          href={getMediaHref(item.mediaId, item.mediaType, {
            type: "trending",
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
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="line-clamp-2 text-xs font-medium text-white">
                {item.title}
              </p>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
