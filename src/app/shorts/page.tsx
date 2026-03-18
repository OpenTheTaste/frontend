import { Header } from "@layouts";
import { ShortsContainer } from "@features/shorts/components";
import { BackButton } from "@shared/components";

export default function ShortsPage() {
  return (
    <div className="bg-ot-background relative flex min-h-screen flex-col overflow-hidden">
      <Header />
      <div className="relative flex-1">
        <BackButton />
        <div className="mt-16">
          <ShortsContainer />
        </div>
      </div>
    </div>
  );
}
