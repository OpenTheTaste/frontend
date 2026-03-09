"use client";

import Image from "next/image";
import Link from "next/link";
import { useMediaLink } from "@shared/hooks";
import { ContentCarousel } from "@entities/home/components";
import { RecommendPlaylistItem } from "@entities/withdraw-recommends/api";
import { useWithdrawContents } from "@entities/withdraw-recommends/hooks";
import { useMemberProfile } from "@/entities/profile/hooks";

export default function TrendingCarousel() {
  const { data } = useWithdrawContents({ page: 0, size: 20 });
  const { data: profile } = useMemberProfile();
  const items = data?.dataList ?? [];
  const { getMediaHref } = useMediaLink();
  

  return (
    <ContentCarousel
      title={`${profile?.nickname ?? ""}님이 좋아하실만한 콘텐츠`}
      itemWidth={180}
      itemHeight={240}
      items={items}
      renderItem={(item: RecommendPlaylistItem) => (
        <Link href={getMediaHref(item.mediaId, item.mediaType)} className="block w-full h-full">
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-ot-gray-800 border border-ot-gray-700">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-medium line-clamp-2">{item.title}</p>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
