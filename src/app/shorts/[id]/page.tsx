import { BackButton } from "@base-components";
import { Header } from "@layouts";
import { ShortsContainer } from "@features/shorts/components";

interface ShortsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShortsDetailPage({
  params,
}: ShortsDetailPageProps) {
  const { id } = await params;
  const shortsId = Number(id);

  return (
    <div className="bg-ot-background relative flex min-h-screen flex-col overflow-hidden">
      <Header />
      <div className="relative flex-1">
        <BackButton />
        <div className="mt-16">
          <ShortsContainer initialShortsId={shortsId} />
        </div>
      </div>
    </div>
  );
}
