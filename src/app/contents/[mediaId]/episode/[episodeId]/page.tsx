import { Footer, Header } from "@layouts";
import { ContentsContainer } from "@entities/video-contents/components";

export default async function EpisodeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ mediaId: string; episodeId: string }>;
    searchParams: Promise<{
      type?: string;
      commentId?: string;
     }>;
}) {
  const seriesMediaId = Number((await params).mediaId);
  const episodeId = Number((await params).episodeId);
  const { type: mediaType, commentId } = await searchParams;

  return (
    <>
      <Header />
      <ContentsContainer
        mediaId={episodeId}
        mediaType={mediaType}
        isEpisodeView={true}
        seriesMediaId={seriesMediaId}
        commentId={commentId ? Number(commentId) : undefined}
      />
      <Footer />
    </>
  );
}
