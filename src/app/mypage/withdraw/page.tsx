// /mypage/withdraw 도메인
import { Header } from "@layouts";
import { GoMypageButton, WithdrawNotice, WithdrawContentBox, WithdrawButton } from "@features/withdraw/components";

export default function MyPageWithdraw() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="w-full max-w-480 flex-1 px-12 py-6">
        <div className="w-full">
          <GoMypageButton />
        </div>
        <div className="flex flex-col items-center w-full">
          <WithdrawNotice />
          <WithdrawContentBox />
          <WithdrawButton />
        </div>
      </main>
    </div>
  );
}
