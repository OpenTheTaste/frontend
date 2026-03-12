"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { Clapperboard } from "lucide-react";
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
import { CommonButton } from "@shared/components";
import { ApiError, PlaylistParams } from "@shared/types";

interface ContentsContainerProps {
  mediaId: number;
  mediaType?: string;
  isEpisodeView?: boolean;
  seriesMediaId?: number;
  playlistParams?: PlaylistParams;
}

export default function ContentsContainer({
  mediaId,
  mediaType,
  isEpisodeView = false,
  seriesMediaId,
  playlistParams,
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
    error: seriesErrorObj,
  } = useSeriesDetail(isSeries ? mediaId : 0);

  const data = isSeries ? seriesData : contentsData;
  const isLoading = isSeries ? seriesLoading : contentsLoading;
  const isError = isSeries ? seriesError : contentsError;

  const isNoEpisode =
    isSeries &&
    isError &&
    seriesErrorObj instanceof AxiosError &&
    (seriesErrorObj as AxiosError<ApiError>).response?.data?.code === "B108";

  if (isLoading) return <div className="flex-1">로딩중...</div>;

  if (isNoEpisode) {
    return (
      <div className="text-ot-text flex flex-1 flex-col items-center justify-center gap-4 px-6">
        <Clapperboard
          className="text-ot-primary-400 mb-2"
          size={80}
          strokeWidth={1.5}
        />
        <h1 className="text-2xl font-bold tracking-tight">
          해당 시리즈에 에피소드가 아직 없어요
        </h1>
        <p className="text-ot-placeholder mb-4 text-center leading-relaxed">
          콘텐츠를 열심히 준비 중이에요.
          <br />
          조금만 기다려 주세요!
        </p>
        <Link href="/">
          <CommonButton variant="primary" className="h-12 px-10 font-semibold">
            홈으로 가기
          </CommonButton>
        </Link>
      </div>
    );
  }

  if (isError || !data)
    return <div className="flex-1">콘텐츠를 찾을 수 없습니다.</div>;

  return (
    <div className="mx-24 my-7">
      <div className="flex gap-14">
        <ContentsMainSection
          content={data}
          mediaId={mediaId}
          mediaType={isSeries ? "SERIES" : "CONTENTS"}
          isEpisodeView={isEpisodeView}
          seriesMediaId={seriesMediaId}
        />

        {isEpisodeView ? (
          seriesMediaId ? (
            <EpisodeSideSection
              seriesMediaId={seriesMediaId}
              currentEpisodeId={mediaId}
            />
          ) : null
        ) : isSeries ? (
          <SeriesSideSection seriesMediaId={mediaId} />
        ) : (
          <SingleSideSection
            mediaId={mediaId}
            playlistParams={playlistParams}
          />
        )}
      </div>
    </div>
  );
}
