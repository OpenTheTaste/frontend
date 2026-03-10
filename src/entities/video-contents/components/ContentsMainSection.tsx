"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { Badge, CommonButton, InteractionButton } from "@base-components";
import { useToggleBookmark } from "@entities/bookmark/hooks";
import { useLikes } from "@entities/likes/hooks";
import {
  ContentsDetailReponse,
  SeriesDetailReponse,
} from "@entities/video-contents/api";
import { DESCRIPTION_MAX_LENGTH } from "@entities/video-contents/constants";
import { useSeriesEpisodeList } from "@entities/video-contents/hooks";
import { MediaType } from "@/shared/types";

interface ContentsMainSectionProps {
  content: ContentsDetailReponse | SeriesDetailReponse;
  mediaId: number;
  mediaType: MediaType;
  isEpisodeView?: boolean;
  seriesMediaId?: number;
}
export default function ContentsMainSection({
  content,
  mediaId,
  mediaType,
  isEpisodeView = false,
  seriesMediaId,
}: ContentsMainSectionProps) {
  const { mutate: toggleLike, isPending: isLikedPending } = useLikes();
  const { mutate: toggleBookmark, isPending: isBookmarkPending } =
    useToggleBookmark();
  const { episodes } = useSeriesEpisodeList(mediaId, {
    enabled: mediaType === "SERIES", // series일 때만 에피소드 리스트 조회 (contents일 때는 X)
  });

  const [isLiked, setIsLiked] = useState<boolean>(content.isLiked);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    content.isBookmarked,
  );

  const [isExpandedDescription, setIsExpandedDescription] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLiked(content.isLiked);
    setIsBookmarked(content.isBookmarked);
  }, [content.isLiked, content.isBookmarked]);

  const router = useRouter();

  const handlePlay = () => {
    if (mediaType === "CONTENTS") {
      router.push(`/player/${mediaId}`);
    } else {
      const resumeId =
        "resumeMediaId" in content ? content.resumeMediaId : null;
      const firstEpisodeId = episodes[0]?.mediaId;
      const targetId = resumeId ?? firstEpisodeId;

      if (!targetId) return;
      router.push(`/contents/${mediaId}/episode/${targetId}?type=SERIES`);
    }
  };

  const truncatedDescription = (text: string) =>
    text.length <= DESCRIPTION_MAX_LENGTH
      ? text
      : text.slice(0, DESCRIPTION_MAX_LENGTH) + "...";

  const handleLikes = () => {
    toggleLike(content.mediaId, {
      onSuccess: () => {
        setIsLiked((prev) => !prev);
      },
    });
  };
  const handleBookmark = () => {
    toggleBookmark(content.mediaId, {
      onSuccess: () => {
        setIsBookmarked((prev) => !prev);
      },
    });
  };

  return (
    <div className="flex-1">
      {mediaType === "CONTENTS" ? (
        <Link href={`/player/${content.mediaId}`}>
          <button className="bg-ot-gray-800 flex aspect-video w-full max-w-284 items-center justify-center rounded-sm">
            <Play className="fill-ot-text stroke-ot-text h-14 w-14" />
          </button>
        </Link>
      ) : (
        <div className="bg-ot-gray-800 flex aspect-video w-full max-w-284 items-center justify-center rounded-sm">
          시리즈 썸네일
        </div>
      )}

      <div className="mt-8 flex items-center gap-4">
        <CommonButton className="mr-3 px-9 py-3" onClick={handlePlay}>
          <Play className="fill-ot-text stroke-ot-text h-6 w-6" />
          <p className="text-lg font-semibold">재생하기</p>
        </CommonButton>

        <InteractionButton
          type="like"
          isActive={isLiked}
          size="md"
          onAction={handleLikes}
          disabled={isLikedPending}
        />

        <InteractionButton
          type="bookmark"
          isActive={isBookmarked}
          size="md"
          onAction={handleBookmark}
          disabled={isBookmarkPending}
        />
      </div>

      <div className="text-ot-text mt-13 max-w-284">
        {/* 에피소드 뷰일 때 시리즈 제목 표시 */}
        {isEpisodeView && seriesMediaId ? (
          <p className="text-3xl font-bold">{content.title}</p>
        ) : (
          // 일반 뷰
          <p className="text-3xl font-bold">{content.title}</p>
        )}

        <div className="mt-5 flex gap-20">
          <div className="w-3/5">
            <p className="text-base leading-relaxed">
              {isExpandedDescription
                ? content.description
                : truncatedDescription(content.description)}
            </p>
            {content.description.length > DESCRIPTION_MAX_LENGTH && (
              <button
                onClick={() => setIsExpandedDescription((prev) => !prev)}
                className="group mt-2 flex cursor-pointer items-center gap-1"
              >
                <ChevronDown
                  className={`text-ot-gray-600 group-hover:text-ot-gray-800 h-5 w-5 stroke-1 transition-transform duration-300 ${
                    isExpandedDescription ? "rotate-180" : "rotate-0"
                  }`}
                />
                <p className="text-ot-gray-600 group-hover:text-ot-gray-800 text-base">
                  {isExpandedDescription ? "접기" : "더 보기"}
                </p>
              </button>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start gap-5">
              <p className="text-lg font-semibold whitespace-nowrap">출연</p>
              <div className="text-ot-text py-[0.063rem] text-base">
                {content.actors}
              </div>
            </div>

            <div className="mt-3 flex items-start gap-5">
              <p className="shrink-0 text-lg font-semibold whitespace-nowrap">
                카테고리
              </p>
              <div className="min-w-0 flex-1 py-1">
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  <Badge text={content.category} />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-5">
              <p className="shrink-0 text-lg font-semibold whitespace-nowrap">
                태그
              </p>
              <div className="min-w-0 flex-1 py-1">
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
