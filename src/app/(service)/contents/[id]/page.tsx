import ContentsContainer from "@/components/contents/ContentsContainer";
import { mockRecommendations, getContentById } from "@/mocks/mockContent";

export default async function ContentsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);

  const content = getContentById(id);

  if (!content) return <div>콘텐츠를 찾을 수 없습니다.</div>;

  return (
    <ContentsContainer
      content={content}
      recommendations={mockRecommendations}
    />
  );
}
