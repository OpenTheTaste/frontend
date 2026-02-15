'use client';

import { useRouter } from 'next/navigation';
import CommonButton from '@/components/common/CommonButton';

export default function OnboardContent() {
  const router = useRouter();

  return (
    <section className="w-full max-w-480 flex flex-col items-center justify-center py-[3rem] px-3 mx-auto bg-background">
      <h1 className="text-[3rem] font-bold text-white mb-2">O+T</h1>
      
      <p className="text-[2rem] text-ot-white text-center mb-2 font-bold">
        무엇을 원하든, 알맞는 추천
      </p>
      
      <p className="text-[1.75rem] text-ot-white text-center mb-11 leading-relaxed">
        정확한 지표를 통한 태그 기반 추천으로<br />
        속깊까지 볼 수 있는 O+T를 시작해보세요
      </p>
      
      <CommonButton 
        onClick={() => router.push('/auth/login')}
        className="px-[2.5rem] py-[0.75rem] text-[1rem] font-bold"
      >
        시작하기
      </CommonButton>
    </section>
  );
}