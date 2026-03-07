"use client";

import {
  ContentsMainSection,
  EpisodeSideSection,
  SeriesSideSection,
  SingleSideSection,
} from "@entities/video-contents/components";
import { useContentsDetail } from "@entities/video-contents/hooks";
import { Episode, Recommendation } from "@shared/types/video-contents/contents";

interface ContentsContainerProps {
  mediaId: number;
  mediaType?: string;
  recommendations?: Recommendation[];
  isEpisodeView?: boolean;
  currentEpisodeId?: number;
  seriesId?: number;
  seriesTitle?: string;
}

export default function ContentsContainer({
  mediaId,
  mediaType,
  recommendations = [],
  isEpisodeView = false,
  currentEpisodeId,
  seriesId,
  seriesTitle,
}: ContentsContainerProps) {
  const { data, isLoading, isError } = useContentsDetail(mediaId);

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>콘텐츠를 찾을 수 없습니다.</div>;

  // fallback: query string 없으면 seriesMediaId로 판단
  const resolvedMediaType =
    mediaType === "SERIES"
      ? "SERIES"
      : data.seriesMediaId
        ? "SERIES"
        : "CONTENTS";

  let otherEpisodes: Episode[] = [];

  // 에피소드 화면일 때 (추후 series episodes API 붙으면 확장)
  if (isEpisodeView && currentEpisodeId) {
    // TODO: series episodes API 연동 시 추가 구현
  }

  return (
    <div className="mx-24 my-7">
      <div className="flex gap-14">
        <ContentsMainSection
          content={data}
          mediaType={resolvedMediaType}
          isEpisodeView={isEpisodeView}
          seriesId={seriesId}
          seriesTitle={seriesTitle}
        />

        {isEpisodeView ? (
          seriesId ? (
            <EpisodeSideSection
              seriesId={seriesId}
              otherEpisodes={otherEpisodes}
            />
          ) : null
        ) : (
          <SingleSideSection
            recommendations={recommendations}
            contentsId={mediaId}
          />
        )}
        {/* FIXME: 시리즈 콘텐츠 API 연동 시 주석 해제 */}
        {/* {mediaType === "SERIES" && (
           <SeriesSideSection
              episodes={displayContent.episodes}
              contentId={displayContent.id}
            />
        )} */}
      </div>
    </div>
  );
}
