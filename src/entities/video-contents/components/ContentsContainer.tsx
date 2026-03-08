"use client";

import {
  ContentsMainSection,
  EpisodeSideSection,
  SeriesSideSection,
  SingleSideSection,
} from "@entities/video-contents/components";
import {
  useContentsDetail,
  useSeriesDetail,
} from "@entities/video-contents/hooks";
import { Recommendation } from "@shared/types/video-contents/contents";

interface ContentsContainerProps {
  mediaId: number;
  mediaType?: string;
  recommendations?: Recommendation[];
  isEpisodeView?: boolean;
  seriesMediaId?: number;
}

export default function ContentsContainer({
  mediaId,
  mediaType,
  recommendations = [],
  isEpisodeView = false,
  seriesMediaId,
}: ContentsContainerProps) {
  const isSeries = mediaType === "SERIES" && !isEpisodeView;

  const {
    data: contentsData,
    isLoading: contentsLoading,
    isError: contentsError,
  } = useContentsDetail(!isSeries ? mediaId : 0);
  const {
    data: seriesData,
    isLoading: seriesLoading,
    isError: seriesError,
  } = useSeriesDetail(isSeries ? mediaId : 0);

  const data = isSeries ? seriesData : contentsData;
  const isLoading = isSeries ? seriesLoading : contentsLoading;
  const isError = isSeries ? seriesError : contentsError;

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !data) return <div>콘텐츠를 찾을 수 없습니다.</div>;

  return (
    <div className="mx-24 my-7">
      <div className="flex gap-14">
        <ContentsMainSection
          content={data}
          mediaId={mediaId}
          mediaType={isSeries ? "SERIES" : "CONTENTS"}
          isEpisodeView={isEpisodeView}
          seriesMediaId={seriesMediaId} // 시리즈의 mediaId
        />

        {isEpisodeView ? (
          seriesMediaId ? (
            <EpisodeSideSection
              seriesMediaId={seriesMediaId}
              currentEpisodeId={mediaId}
            />
          ) : null
        ) : isSeries ? (
          <SeriesSideSection episodes={[]} seriesMediaId={mediaId} />
        ) : (
          <SingleSideSection
            recommendations={recommendations}
            contentsId={mediaId}
          />
        )}
      </div>
    </div>
  );
}
