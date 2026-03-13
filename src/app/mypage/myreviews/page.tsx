import { Header } from "@layouts";
import { BackButton } from "@base-components";

export default function MyPageReviews() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col items-center">
      <Header />
      <main className="relative w-full max-w-480 flex-1 px-12 py-6">
        <BackButton />
      </main>
    </div>
  )
}