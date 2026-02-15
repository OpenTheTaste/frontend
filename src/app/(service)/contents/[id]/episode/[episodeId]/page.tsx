import ContentsContainer from "@/components/contents/ContentsContainer";
import { getContentById } from "@/mocks/mockContent";

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string; episodeId: string }>;
}) {
  const seriesId = Number((await params).id);
  const episodeId = Number((await params).episodeId);

  const series = getContentById(seriesId);

  if (!series || series.type !== "series") {
    return <div>시리즈를 찾을 수 없습니다.</div>;
  }

  const episode = series.episodes.find((ep) => ep.id === episodeId);

  if (!episode) {
    return <div>에피소드를 찾을 수 없습니다.</div>;
  }

  return (
    <ContentsContainer
      content={series}
      isEpisodeView={true}
      currentEpisodeId={episodeId}
      seriesId={seriesId}
      seriesTitle={series.title}
    />
  );
}
