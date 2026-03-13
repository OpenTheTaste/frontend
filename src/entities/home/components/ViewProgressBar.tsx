interface ViewProgressBarProps {
  duration: number | null;
  positionSec: number;
}

export default function ViewProgressBar({
  duration,
  positionSec,
}: ViewProgressBarProps) {
  if (!duration || duration <= 0 || positionSec <= 0) return null;

  const progress = Math.min(positionSec / duration, 1) * 100;

  return (
    <div className="h-1 w-full bg-white/30">
      <div
        className="h-full bg-red-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
