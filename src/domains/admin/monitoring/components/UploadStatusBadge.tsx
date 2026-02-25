import { cn } from "@/utils/cn";

interface UploadStatusBadgeProps {
  text: string;
  status: "ORIGIN_UPLOADED" | "TRANSCODING" | "UPLOADING" | "COMPLETED";
  className?: string;
}

export default function UploadStatusBadge({
  text,
  status = "ORIGIN_UPLOADED",
  className,
}: UploadStatusBadgeProps) {
  const statusStyles = {
    ORIGIN_UPLOADED: "bg-ot-secondary-200 text-ot-secondary-600 border-ot-secondary-500",
    TRANSCODING: "bg-ot-primary-200 text-ot-primary-500 border-ot-primary-400",
    UPLOADING: "bg-ot-secondary-400 text-ot-secondary-900 border-ot-secondary-800",
    COMPLETED: "bg-ot-gray-600 text-ot-gray-900 border-ot-gray-100",
  };

  return (
    <div className="flex justify-center">
      <span
        className={cn(
          "w-25 inline-flex justify-center items-center h-7",
          "rounded-md text-[11px] font-bold border whitespace-nowrap transition-all",
          statusStyles[status],
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
}
