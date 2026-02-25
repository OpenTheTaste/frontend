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
    ORIGIN_UPLOADED: "bg-ot-secondary-200 text-ot-secondary-600 ",
    TRANSCODING: "bg-ot-primary-200 text-ot-primary-500 ",
    UPLOADING: "bg-ot-secondary-400 text-ot-secondary-900 ",
    COMPLETED: "bg-ot-gray-600 text-ot-gray-900 ",
  };

  return (
    <div className="flex justify-center">
      <span
        className={cn(
          "w-25 inline-flex justify-center items-center h-7",
          "rounded-md text-[14px] font-bold whitespace-nowrap transition-all",
          statusStyles[status],
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
}
