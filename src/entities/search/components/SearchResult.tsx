"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SearchTip } from "@entities/search/components";
import { useInfiniteSearchList } from "@entities/search/hooks";
import { useMediaLink } from "@shared/hooks";

interface SearchResultProps {
  keyword?: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const { getMediaHref } = useMediaLink();

  const hasSearched = (keyword?.trim().length ?? 0) >= 2;

  const { searchList, isFetching, observerRef, isFetchingNextPage } =
    useInfiniteSearchList({
      page: 0,
      size: 24,
      searchWord: keyword,
    });

  const hasResults = searchList.length > 0;

  if (!hasSearched) {
    return (
      <>
        <div className="border-ot-gray-700 w-full border" />
        <SearchTip />
      </>
    );
  }

  if (!isFetching && !hasResults) {
    return (
      <div className="flex flex-col items-center gap-y-20">
        <p className="text-ot-text text-2xl">
          <span className="font-bold">"{keyword}"</span>에 대한 검색 결과가
          없습니다
        </p>
        <div className="border-ot-gray-700 w-full border" />
        <SearchTip />
      </div>
    );
  }

  return (
    <div className="-mt-10 flex flex-col gap-y-8">
      <p className="text-ot-text text-2xl">
        <span className="font-bold">"{keyword}"</span>에 대한 검색 결과
      </p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {searchList.map((item) => (
          <div key={`${item.mediaType}-${item.mediaId}`}>
            <div className="bg-ot-gray-800 relative aspect-5/7 w-full rounded-lg">
              <Link
                href={getMediaHref(item.mediaId, item.mediaType, {
                  type: "search",
                })}
                className="block"
              >
                <Image
                  src={item.posterUrl}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="rounded-lg object-cover"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div ref={observerRef} className="flex h-4 justify-center">
        {isFetchingNextPage && (
          <Loader2
            className="text-ot-placeholder mt-1 animate-spin"
            size={20}
          />
        )}
      </div>
    </div>
  );
}
