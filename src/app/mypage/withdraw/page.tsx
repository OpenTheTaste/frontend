import { Header } from "@layouts";
import {
  GoMypageButton,
  WithdrawButton,
  WithdrawContentBox,
  WithdrawNotice,
} from "@features/withdraw/components";

export default function MyPageWithdraw() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="relative w-full max-w-480 flex-1 px-12 py-6">
        <GoMypageButton />
        <div className="mt-4 flex w-full flex-col items-center">
          <WithdrawNotice />
          <WithdrawContentBox />
          <WithdrawButton />
        </div>
      </main>
    </div>
  );
}
