import { Header } from "@layouts";
import { MyReviewList } from "@features/myreviews/components";
import { BackButton } from "@shared/components";

export default function MyPageReviews() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col items-center">
      <Header />
      <main className="relative flex w-full max-w-480 flex-1 flex-col gap-6 px-12 py-6">
        <BackButton />
        <h1 className="text-ot-text flex items-center justify-center gap-2 text-3xl font-bold">
          내가 작성한 댓글
        </h1>
        <MyReviewList />
      </main>
    </div>
  );
}
