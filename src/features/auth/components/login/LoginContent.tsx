"use client";

import Image from "next/image";
import { useKakaoLogin } from "@/entities/auth/hooks/useKakaoLogin";

export default function LoginContent() {
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <section className="w-full h-[70vh] bg-ot-background flex-1 flex items-center justify-center py-12">
      <div className="px-6 max-w-2xl mx-auto w-full flex flex-col items-center">
        <h1 className="text-[2rem] font-bold text-ot-text mb-4 text-center">
          로그인 정보를 입력해주세요
        </h1>
        <p className="text-[1rem] text-ot-gray-500 text-center mb-8">
          계정이 없다면 새로운 계정으로 시작해주세요
        </p>
        <button
          onClick={handleKakaoLogin}
          className="w-full max-w-80 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/images/btn_login_kakao.svg"
            alt="카카오 로그인"
            width={320}
            height={70}
            priority
          />
        </button>
        <p className="text-[1rem] text-ot-gray-600 text-center mt-6">
          로그인 시 <span className="text-ot-text">이용약관</span> 및{" "}
          <span className="text-ot-text">개인정보처리방침</span>에 동의하게
          됩니다.
        </p>
      </div>
    </section>
  );
}
