import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full px-12 py-10 bg-ot-background">
      <div className="border-t border-ot-gray-700 pt-10">
        <div className="flex items-center justify-center gap-6 text-[0.75rem] text-ot-gray-600">
          <Link href="/help" className="hover:underline">문의하기</Link>
          <Link href="/policy/terms" className="hover:underline">이용약관</Link>
          <Link href="/policy/privacy" className="hover:underline">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
};
