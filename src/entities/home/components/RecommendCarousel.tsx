"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentCarousel } from "@entities/home/components";
import { useMemberProfile } from "@entities/profile/hooks";
import { RecommendPlaylistItem } from "@entities/withdraw-recommends/api";
import { useWithdrawContents } from "@entities/withdraw-recommends/hooks";
import { useMediaLink } from "@shared/hooks";

export default function RecommendCarousel() {
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
