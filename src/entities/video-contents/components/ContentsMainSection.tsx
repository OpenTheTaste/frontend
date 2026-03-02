"use client";

import { CommonButton, Badge, InteractionButton } from "@base-components";
import { Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { DESCRIPTION_MAX_LENGTH } from "@/entities/video-contents/constants/contentDescription";
import {
  SingleContent,
  SeriesContent,
} from "@shared/types/video-contents/contents";
import { useRouter } from "next/navigation";

interface ContentsMainSectionProps {
  content: SingleContent | SeriesContent;
  isEpisodeView?: boolean;
  seriesId?: number;
  seriesTitle?: string;
}
export default function ContentsMainSection({
  content,
  isEpisodeView = false,
  seriesId,
  seriesTitle,
}: ContentsMainSectionProps) {
  const [like, setLike] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [isExpandedDescription, setIsExpandedDescription] =
    useState<boolean>(false);

  const router = useRouter();

  const handlePlay = () => {
    if (content.type === "single") {
      // 단편일 경우 -> 바로 플레이어로 이동
      router.push(`/player/${content.id}`);
    } else {
      // 시리즈일 경우 이어보기 or 1화로 이동
      const series = content as SeriesContent;
      if (series.episodes.length === 0) return;
      const targetEpisodeId =
        series.lastWatchedEpisode ?? series.episodes[0].id;
      router.push(`/contents/${content.id}/episode/${targetEpisodeId}`);
    }
  };

  const truncatedDescription = (text: string) =>
    text.length <= DESCRIPTION_MAX_LENGTH
      ? text
      : text.slice(0, DESCRIPTION_MAX_LENGTH) + "...";

  return (
    <div className="flex-1">
      {content.type === "single" ? (
        <Link href={`/player/${content.id}`}>
          <button className="aspect-video w-full max-w-284 bg-ot-gray-800 rounded-sm flex items-center justify-center">
            <Play className="fill-ot-text stroke-ot-text w-14 h-14" />
          </button>
        </Link>
      ) : (
        <div className="aspect-video w-full max-w-284 bg-ot-gray-800 rounded-sm flex items-center justify-center">
          시리즈 썸네일
        </div>
      )}

      <div className="flex gap-4 mt-8 items-center">
        <CommonButton className="px-9 py-3 mr-3" onClick={handlePlay}>
          <Play className="fill-ot-text stroke-ot-text w-6 h-6" />
          <p className="font-semibold text-lg">재생하기</p>
        </CommonButton>

        <InteractionButton
          type="like"
          isActive={like}
          size="md"
          onAction={() => setLike((prev) => !prev)}
        />

        <InteractionButton
          type="bookmark"
          isActive={bookmark}
          size="md"
          onAction={() => setBookmark((prev) => !prev)}
        />
      </div>

      <div className="mt-13 text-ot-text max-w-284">
        {/* 에피소드 뷰일 때 시리즈 제목 표시 */}
        {isEpisodeView && seriesId && seriesTitle ? (
          <p className="font-bold text-3xl">
            {seriesTitle}: {content.title}
          </p>
        ) : (
          // 일반 뷰
          <p className="font-bold text-3xl">{content.title}</p>
        )}

        <div className="flex gap-20 mt-5">
          <div className="w-3/5">
            <p className="text-md leading-relaxed">
              {isExpandedDescription
                ? content.description
                : truncatedDescription(content.description)}
            </p>
            {content.description.length > DESCRIPTION_MAX_LENGTH && (
              <button
                onClick={() => setIsExpandedDescription((prev) => !prev)}
                className="flex gap-1 mt-2 items-center cursor-pointer group"
              >
                <ChevronDown
                  className={`w-5 h-5 stroke-1 text-ot-gray-600 group-hover:text-ot-gray-800 transition-transform duration-300 ${
                    isExpandedDescription ? "rotate-180" : "rotate-0"
                  }`}
                />
                <p className="text-md text-ot-gray-600 group-hover:text-ot-gray-800">
                  {isExpandedDescription ? "접기" : "더 보기"}
                </p>
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start gap-5">
              <p className="text-lg font-semibold whitespace-nowrap">출연</p>
              <div className="text-base text-ot-text py-[0.063rem]">
                {content.cast}
              </div>
            </div>

            <div className="flex items-start gap-5 mt-3">
              <p className="text-lg font-semibold whitespace-nowrap shrink-0">
                카테고리
              </p>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {content.categories.map((category, index) => (
                    <Badge key={index} text={category} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-5 mt-3">
              <p className="text-lg font-semibold whitespace-nowrap shrink-0">
                태그
              </p>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {content.tags.map((tag, index) => (
                    <Badge key={index} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
