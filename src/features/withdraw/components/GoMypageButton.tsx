import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function GoMypageButton() {
  return (
    <Link
      href="/mypage"
      aria-label="마이페이지로 이동하기"
      className="absolute top-4 left-11 group flex items-center gap-3 text-ot-text hover:text-ot-gray-600"
    >
      <ChevronLeft size={36} className="group-hover:text-ot-gray-600" />
      <p className="text-[18px] font-semibold group-hover:text-ot-gray-600">
        마이페이지로 돌아가기
      </p>
    </Link>
  );
}
