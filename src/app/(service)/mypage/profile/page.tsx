// /mypage/profile 도메인
import Header from "@/components/common/Header";
import BackButton from "@/components/mypage/profile/BackButton";
import ProfileEditor from "@/components/mypage/profile/ProfileEditor";
import EditFavoriteTags from "@/components/mypage/profile/EditFavoriteTags";
import FinishEditButton from "@/components/mypage/profile/FinishEditButton";
import AccoutActionButtons from "@/components/mypage/profile/AccountActionButtons";

export default function MyPageProfile() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />

      <main className="w-full max-w-480 flex-1 px-10 py-6">
        <BackButton />
        <ProfileEditor />
        <EditFavoriteTags />
        <div className="relative flex justify-center items-center w-full">
          {/* 수정하기 버튼 : 화면 가운데 아래 배치 */}
          <FinishEditButton />
          {/* 로그아웃 | 회원탈퇴 버튼 : 오른쪽 끝에 배치 */}
          <div className="absolute right-0 bottom-0">
            <AccoutActionButtons />
          </div>
        </div>
      </main>
    </div>
  );
}
