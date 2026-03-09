import { VideoPlayer } from "@features/player/components";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ mediaId: string }>;
}) {
  const mediaId = Number((await params).mediaId);
  return (
    <div className="bg-black">
      <VideoPlayer mediaId={mediaId} />
    </div>
  );
}
