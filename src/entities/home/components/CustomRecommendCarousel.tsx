"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ContentCarousel } from "@entities/home/components";
import { useMemberProfile } from "@entities/profile/hooks";
import { useMediaLink } from "@shared/hooks";
import { useRadarRecommend } from "@/entities/custom/hooks";
import { PlaylistItem } from "@/shared/types";

export default function CustomRecommendCarousel() {
  const [page, setPage] = useState(0);
  const { data } = useRadarRecommend({ page, size: 20 });
  const { data: profile } = useMemberProfile();
  const items = data?.dataList ?? [];
  const { getMediaHref } = useMediaLink();

  if (!items.length) return null;

  return (
    <ContentCarousel
      title={`${profile?.nickname ?? ""}님의 커스텀 추천 플레이리스트`}
      itemWidth={180}
      itemHeight={240}
      items={items}
      onRefresh={setPage}
      renderItem={(item: PlaylistItem) => (
        <Link
          href={getMediaHref(item.mediaId, item.mediaType, {
            type: "recommend",
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
