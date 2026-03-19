import { Suspense } from "react";
import { Footer, Header } from "@layouts";
import { MyPageContent, ProfileInfo } from "@features/mypage/components";
import { TabBarSkeleton } from "@entities/profile/components";

export default function MyPage() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col items-center">
      <Header />

      <main className="w-full max-w-480 flex-1 px-12 py-6">
        <div className="mt-14 mb-8 flex w-full items-end justify-between">
          {/* 왼쪽 : 사용자 프로필 정보 */}
          <ProfileInfo />
        </div>
        {/* 저장한 작품들 리스트 */}
        {/* useSearchParams를 사용하는 컴포넌트는 Suspense로 감싸야 함 */}
        <Suspense fallback={<TabBarSkeleton />}>
          <MyPageContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
