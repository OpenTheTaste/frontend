import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ContentMainSection from "@/components/contents/ContentsMainSection";
import SeriesSideSection from "@/components/contents/SeriesSideSection";
import SingleSideSection from "@/components/contents/SingleSideSection";
import EpisodeSideSection from "@/components/contents/EpisodeSideSection";
import {
  Episode,
  Recommendation,
  SeriesContent,
  SingleContent,
} from "@/types/contents";

interface ContentsContainerProps {
  content: SingleContent | SeriesContent;
  recommendations?: Recommendation[];
  isEpisodeView?: boolean; // 에피소드 뷰 전용 props
  currentEpisodeId?: number;
  seriesId?: number;
  seriesTitle?: string;
}

export default function ContentsContainer({
  content,
  recommendations = [],
  isEpisodeView = false,
  currentEpisodeId,
  seriesId,
  seriesTitle,
}: ContentsContainerProps) {
  // 에피소드 뷰일 때 현재 에피소드 찾기
  let displayContent = content;
  let otherEpisodes: Episode[] = [];

  if (isEpisodeView && content.type === "series" && currentEpisodeId) {
    const currentEpisode = content.episodes.find(
      (ep) => ep.id === currentEpisodeId,
    );
    if (currentEpisode) {
      // 현재 에피소드를 SingleContent 형태로 변환 (UI가 동일하기 때문에)
      displayContent = {
        type: "single" as const,
        id: currentEpisode.id,
        title: currentEpisode.title,
        description: currentEpisode.description,
        cast: currentEpisode.cast,
        tags: content.tags,
        categories: content.categories,
        thumbnail: currentEpisode.thumbnail,
      };
      // 다른 에피소드들
      otherEpisodes = content.episodes.filter(
        (ep) => ep.id !== currentEpisodeId,
      );
    }
  }

  return (
    <>
      <Header />

      <div className="mx-24 my-7">
        <div className="flex gap-14">
          <ContentMainSection
            content={displayContent}
            isEpisodeView={isEpisodeView}
            seriesId={seriesId}
            seriesTitle={seriesTitle}
          />

          {isEpisodeView ? (
            // 시리즈 별 회차 (에피소드 - 댓글 O)
            <EpisodeSideSection
              seriesId={seriesId!}
              otherEpisodes={otherEpisodes}
            />
          ) : displayContent.type === "single" ? (
            // 단편 콘텐츠
            <SingleSideSection recommendations={recommendations} />
          ) : (
            // 시리즈 콘텐츠 (첫 진입 시 UI - 댓글 X)
            <SeriesSideSection
              episodes={displayContent.episodes}
              contentId={displayContent.id}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
