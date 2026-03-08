import { Footer, Header } from "@layouts";
import { ContentsContainer } from "@entities/video-contents/components";

export default async function ContentsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const mediaId = Number((await params).id);
  const mediaType = (await searchParams).type;

  return (
    <>
      <Header />
      <ContentsContainer mediaId={mediaId} mediaType={mediaType} />
      <Footer />
    </>
  );
}
