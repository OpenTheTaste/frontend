import { Header } from "@layouts";
import { BackButton } from "@base-components";
import { ShortsContainer } from "@entities/shorts/components";

export default function ShortsPage() {
  return (
    <div className="relative min-h-screen bg-ot-background flex flex-col overflow-hidden">
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
