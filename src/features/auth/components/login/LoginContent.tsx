"use client";

import Image from "next/image";
import Link from "next/link";
import { useKakaoLogin } from "@entities/auth/hooks";

export default function LoginContent() {
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <section className="bg-ot-background flex h-[73.5vh] w-full flex-1 items-center justify-center py-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6">
        <h1 className="text-ot-text mb-4 text-center text-[2rem] font-bold">
          로그인 정보를 입력해주세요
        </h1>
        <p className="text-ot-gray-500 mb-8 text-center text-[1rem]">
          계정이 없다면 새로운 계정으로 시작해주세요
        </p>
        <button
          onClick={handleKakaoLogin}
          className="w-full max-w-80 transition-opacity hover:opacity-90"
        >
          <Image
            src="/images/btn_login_kakao.svg"
            alt="카카오 로그인"
            width={320}
            height={70}
            priority
          />
        </button>
        <p className="text-ot-gray-600 mt-6 text-center text-[1rem]">
          로그인 시{" "}
          <Link href="/policy/terms" className="text-ot-text hover:underline">
            이용약관
          </Link>{" "}
          및{" "}
          <Link href="/policy/privacy" className="text-ot-text hover:underline">
            개인정보처리방침
          </Link>{" "}
          에 동의하게 됩니다.
        </p>
      </div>
    </section>
  );
}
