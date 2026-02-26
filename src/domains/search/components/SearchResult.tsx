"use client";

import { SearchTip } from "@search";
import Image from "next/image";
import Link from "next/link";

const MOCK_CONTENTS = [
  {
    id: 1,
    title: "다만 악에서 구하소서",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
  {
    id: 2,
    title: "다만 악에서 구하소서",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
  {
    id: 3,
    title: "다만 악에서 구하소서 악에서 구하소서보이",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
  {
    id: 4,
    title: "다만 악에서 구하소서",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
  {
    id: 5,
    title: "다만 악에서 구하소서",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
  {
    id: 6,
    title: "다만 악에서 구하소서 악에서 구하소서보이",
    thumbnailVertical: "/images/recommendcontent_img.png",
  },
];

interface SearchResultProps {
  keyword?: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const searchQuery = keyword ?? "";
  const hasSearched = searchQuery !== "";

  const filteredResults = hasSearched
    ? MOCK_CONTENTS.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  const hasResults = filteredResults.length > 0;

  // 결과 있을 때만 gap-y-20 → gap-y-10 효과를 위해 -mt-10 적용
  if (!hasSearched) {
    return (
      <>
        <div className="border border-ot-gray-700 w-full" />
        <SearchTip />
      </>
    );
  }

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center gap-y-20">
        <p className="text-ot-text text-2xl">
          <span className="font-bold">"{searchQuery}"</span>에 대한 검색 결과가
          없습니다
        </p>
        <div className="border border-ot-gray-700 w-full" />
        <SearchTip />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8 -mt-10">
      <p className="text-ot-text text-2xl">
        <span className="font-bold">"{searchQuery}"</span>에 대한 검색 결과
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {filteredResults.map((item) => (
          <div key={item.id}>
            <div className="relative w-full aspect-5/7">
              <Link
                key={item.id}
                href={`/contents/${item.id}`}
                className="block"
              >
                <Image
                  src={item.thumbnailVertical}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
