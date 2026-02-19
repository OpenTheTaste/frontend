// /mypage/withdraw 도메인
import Header from "@/components/common/Header";
import GoMypageButton from "@/components/mypage/withdraw/GoMypageButton";
import WithdrawNotice from "@/components/mypage/withdraw/WithdrawNotice";
import WithdrawButton from "@/components/mypage/withdraw/WithdrawButton";

export default function MyPageWithdraw() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="w-full max-w-480 flex-1 px-12 py-12">
        <div className="w-full">
          <GoMypageButton />
        </div>
        <div className="flex flex-col items-center w-full">
          <WithdrawNotice />
          <WithdrawButton />
        </div>
      </main>
    </div>
  );
}
