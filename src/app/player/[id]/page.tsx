import { VideoPlayer } from "@features/player/components";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  return (
    <div className="bg-black">
      <VideoPlayer mediaId={id} />
    </div>
  );
}
