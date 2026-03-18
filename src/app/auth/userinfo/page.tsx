import { Footer } from "@layouts";
import { ContentInterest, HeaderNoButton } from "@features/auth/components";

export default function InterestPage() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col">
      <HeaderNoButton />
      <ContentInterest />
      <Footer />
    </div>
  );
}
