import { cn } from "@/utils/cn";

interface UploadProgressBarProps {
  progress: number;
  className?: string;
}

export default function UploadProgressBar({ progress = 0, className }: UploadProgressBarProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      <div className="relative w-full h-2 bg-ot-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-ot-primary-gradient rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
