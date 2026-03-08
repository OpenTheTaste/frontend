import { Footer, Header } from "@layouts";
import { ContentsContainer } from "@entities/video-contents/components";

export default async function EpisodeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; episodeId: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const seriesId = Number((await params).id);
  const episodeId = Number((await params).episodeId);
  const mediaType = (await searchParams).type;

  return (
    <>
      <Header />
      <ContentsContainer
        mediaId={episodeId}
        mediaType={mediaType}
        isEpisodeView={true}
        seriesId={seriesId}
      />
      <Footer />
    </>
  );
}
