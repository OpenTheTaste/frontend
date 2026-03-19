import { Header } from "@layouts";
import {
  AccountActionButtons,
  ProfileEditContainer,
} from "@features/profile/components";
import { BackButton } from "@shared/components";

export default function MyPageProfile() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="relative w-full max-w-480 flex-1 px-12 py-6">
        <BackButton />
        <ProfileEditContainer />
        <div className="relative flex w-full items-center justify-center">
          {/* 로그아웃 | 회원탈퇴 버튼 : 오른쪽 끝에 배치 */}
          <div className="absolute right-0 bottom-0">
            <AccountActionButtons />
          </div>
        </div>
      </main>
    </div>
  );
}
