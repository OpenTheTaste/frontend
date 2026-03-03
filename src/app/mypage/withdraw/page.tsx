import { Header } from "@layouts";
import {
  GoMypageButton,
  WithdrawNotice,
  WithdrawContentBox,
  WithdrawButton,
} from "@features/withdraw/components";

export default function MyPageWithdraw() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="relative w-full max-w-480 flex-1 px-12 py-6">
        <GoMypageButton />
        <div className="flex flex-col items-center w-full mt-4">
          <WithdrawNotice />
          <WithdrawContentBox />
          <WithdrawButton />
        </div>
      </main>
    </div>
  );
}
