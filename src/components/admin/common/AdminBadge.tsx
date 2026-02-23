import { cn } from "@/utils/cn";

type AdminBadgeVariant = "공개" | "비공개" | "관리자" | "사용자" | "활성";

interface AdminBadgeProps {
  variant: AdminBadgeVariant;
  className?: string;
}

// const variantStyle: Record<AdminBadgeVariant, string> = {
//   공개: "bg-[#CCFBF1] text-[#298880]",
//   비공개: "bg-ot-primary-100 text-[#882929]",
// };

export default function AdminBadge({ variant, className }: AdminBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center text-xs rounded-[1.25rem] px-3 py-0.5 font-medium",
        // variantStyle[variant],
        className,
      )}
    >
      {variant}
    </div>
  );
}
