import Link from "next/link";
import { CommonButton } from "@shared/components";

export default function MainSection() {
  return (
    <section className="mx-auto flex w-full max-w-480 flex-col items-center justify-center px-3 py-12">
      <h1 className="text-ot-text mb-2 text-[3rem] font-bold">O+T</h1>

      <p className="text-ot-text mb-1 text-center text-[1.75rem] font-bold">
        무엇을 원하든, 알맞는 추천
      </p>

      <p className="text-ot-text mb-6 text-center text-[1rem] leading-relaxed font-bold">
        정확한 지표를 통한 태그 기반 추천으로
        <br />
        숏폼까지 볼 수 있는 O+T를 시작해보세요
      </p>
      <Link href="auth/login">
        <CommonButton className="px-10 py-3 text-[1rem] font-bold">
          시작하기
        </CommonButton>
      </Link>
    </section>
  );
}
