'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import kakaoLoginBtn from '@/assets/images/btn_login_kakao.svg';


export default function LoginContent() {
  const router = useRouter();

  return (
    <section className="w-full bg-ot-background flex-1 flex items-center justify-center py-12">
      <div className="px-6 max-w-2xl mx-auto w-full flex flex-col items-center">
        <h1 className="text-[1.5rem] font-bold text-white mb-4 text-center">
          로그인 정보를 입력해주세요
        </h1>
        
        <p className="text-[0.875rem] text-ot-gray-500 text-center mb-8">
          계정이 없다면 새로운 계정으로 시작해주세요
        </p>

        <button
          onClick={() => router.push('/auth/userinfo')}
          className="w-full max-w-[250px] hover:opacity-90 transition-opacity"
        >
          <Image
            src={kakaoLoginBtn}
            alt="카카오 로그인"
            width={250}
            height={56}
            priority
          />
        </button>

        <p className="text-[0.75rem] text-ot-gray-600 text-center mt-6">
          로그인 시 <span className="text-white">이용약관</span> 및 <span className="text-white">개인정보처리방침</span>에 동의하게 됩니다.
        </p>
      </div>
    </section>
  );
}