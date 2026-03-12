import Link from "next/link";
import { CircleAlert } from "lucide-react";
import { CommonButton } from "@shared/components";

export default function NotFound() {
  return (
    <div className="bg-ot-background text-ot-text flex min-h-screen flex-col items-center justify-center gap-4 px-6">
      <CircleAlert
        className="text-ot-primary-400 mb-2"
        size={80}
        strokeWidth={1.5}
      />

      <h1 className="text-2xl font-bold tracking-tight">
        현재 페이지를 찾을 수 없습니다.
      </h1>

      <p className="text-ot-placeholder mb-4 text-center leading-relaxed">
        홈페이지로 이동해 다양한 콘텐츠를 즐겨보세요!
      </p>

      <Link href="/">
        <CommonButton variant="primary" className="h-12 px-10 font-semibold">
          홈으로 가기
        </CommonButton>
      </Link>
    </div>
  );
}
