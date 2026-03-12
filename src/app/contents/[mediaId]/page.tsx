import { Footer, Header } from "@layouts";
import { ContentsContainer } from "@entities/video-contents/components";

export default async function ContentsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ mediaId: string }>;
  searchParams: Promise<{
    type?: string;
    playlist?: string;
    tagId?: string;
    index?: string;
    query?: string;
    commentId?: string; // 추가함
  }>;
}) {
  const mediaId = Number((await params).mediaId);
  const { type: mediaType, playlist, tagId, index, query, commentId } = await searchParams;

  const playlistParams = {
    playlist,
    tagId,
    index,
    query,
  };

  return (
    <>
      <Header />
      <ContentsContainer
        mediaId={mediaId}
        mediaType={mediaType}
        playlistParams={playlistParams}
        commentId={commentId ? Number(commentId) : undefined} // 추가함
      />
      <Footer />
    </>
  );
}
