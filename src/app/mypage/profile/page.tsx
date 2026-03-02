import { Header } from "@layouts";
import { BackButton } from "@base-components";
import { ProfileEditor, EditFavoriteTagsUI, AccountActionButtons } from "@features/profile/components";

export default function MyPageProfile() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />

      <main className="w-full max-w-480 flex-1 px-12 py-6">
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
