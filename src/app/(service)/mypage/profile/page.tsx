// /mypage/profile 도메인
import Header from "@/components/common/Header";
import BackButton from "@/components/mypage/profile/BackButton";
import ProfileEditor from "@/components/mypage/profile/ProfileEditor";
import EditFavoriteTagsUI from "@/components/mypage/profile/EditFavoriteTagsUI";
import AccountActionButtons from "@/components/mypage/profile/AccountActionButtons";

export default function MyPageProfile() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />

      <main className="w-full max-w-480 flex-1 px-10 py-6">
        <BackButton />
        <ProfileEditor />
        <EditFavoriteTagsUI />
        <div className="relative flex justify-center items-center w-full">
          {/* 로그아웃 | 회원탈퇴 버튼 : 오른쪽 끝에 배치 */}
          <div className="absolute right-0 bottom-0">
            <AccountActionButtons />
          </div>
        </div>
      </main>
    </div>
  );
}
