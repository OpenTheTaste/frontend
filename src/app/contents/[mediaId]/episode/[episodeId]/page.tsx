import { Footer, Header } from "@layouts";
import { ContentsContainer } from "@entities/video-contents/components";

export default async function EpisodeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ mediaId: string; episodeId: string }>;
    searchParams: Promise<{
      type?: string;
      commentId?: string; // 추가함
     }>;
}) {
  const seriesMediaId = Number((await params).mediaId);
  const episodeId = Number((await params).episodeId);
  // const mediaType = (await searchParams).type;
  const { type: mediaType, commentId } = await searchParams; // 추가함

  return (
    <>
      <Header />
      <ContentsContainer
        mediaId={episodeId}
        mediaType={mediaType}
        isEpisodeView={true}
        seriesMediaId={seriesMediaId}
        commentId={commentId ? Number(commentId) : undefined} // 추가함
      />
      <Footer />
    </>
  );
}
