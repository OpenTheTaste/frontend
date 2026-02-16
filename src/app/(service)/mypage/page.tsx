// /mypage 도메인
import { Suspense } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import UserMenuButtons from "@/components/mypage/main/UserMenuButtons";
import ProfileInfo from "@/components/mypage/main/ProfileInfo";
import MyPageContent from "@/components/mypage/main/MyPageContent";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <Header />

      <main className="w-full max-w-480 flex-1 px-25 py-15.5">
        <div className="flex justify-between items-end w-full">
          {/* 왼쪽 : 사용자 프로필 정보 */}
          <ProfileInfo />
          {/* 오른쪽 : "대시보드" & "내 댓글 목록" 버튼 */}
          <UserMenuButtons />
        </div>
        {/* 저장한 작품들 리스트 */}
        {/* useSearchParams를 사용하는 컴포넌트는 Suspense로 감싸야 함 */}
        <Suspense fallback={<div className="text-white">로딩 중...</div>}>
          <MyPageContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
