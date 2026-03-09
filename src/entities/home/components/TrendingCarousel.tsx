"use client";

import Image from "next/image";
import Link from "next/link";
import { useTrendingList } from "../hooks/useTrendingList";
import { useMediaLink } from "../hooks/useMediaLink";
import ContentCarousel from "./ContentCarousel";
import { TrendingListItem } from "@/shared/types/home";

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
      renderItem={(item: TrendingListItem) => (
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
