import { ContentsContainer } from "@entities/video-contents/components";

// import { getContentById } from "@shared/mocks/mockContent";

export default async function EpisodeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const seriesId = Number((await params).id);
  // const episodeId = Number((await params).episodeId);

  const mediaId = Number((await params).id);
  const mediaType = (await searchParams).type;

  // const series = getContentById(seriesId);

  // if (!series || series.mediaType !== "SERIES") {
  //   return <div>시리즈를 찾을 수 없습니다.</div>;
  // }

  // const episode = series.episodes.find((ep) => ep.id === episodeId);

  // if (!episode) {
  //   return <div>에피소드를 찾을 수 없습니다.</div>;
  // }

  return <ContentsContainer mediaId={mediaId} mediaType={mediaType} />;
}
