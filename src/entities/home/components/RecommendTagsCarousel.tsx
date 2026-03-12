"use client";

import Image from "next/image";
import Link from "next/link";
import { ContentCarousel } from "@entities/home/components";
import { useTagsList } from "@entities/home/hooks";
import { useMemberProfile } from "@entities/profile/hooks";
import { useMediaLink } from "@shared/hooks";
import { PlaylistItem } from "@/shared/types";

export default function RecommendTagsCarousel({ index }: { index: number }) {
  const { data } = useTagsList({ page: 0, size: 20, index });
  const { data: profile } = useMemberProfile();
  const items = data?.medias.dataList ?? [];
  const { getMediaHref } = useMediaLink();

  const title =
    data?.tag.name && profile?.nickname
      ? `${profile.nickname}님이 좋아하는 #${data.tag.name}`
      : "";

  return (
    <ContentCarousel
      title={title}
      itemWidth={180}
      itemHeight={240}
      items={items}
      renderItem={(item: PlaylistItem) => (
        <Link
          href={getMediaHref(item.mediaId, item.mediaType, {
            type: "topTag",
            index: index as 0 | 1 | 2,
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
