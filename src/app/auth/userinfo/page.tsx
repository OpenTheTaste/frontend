import { HeaderNoButton, ContentInterest } from "@features-auth";
import { Footer } from "@layouts";

export default function InterestPage() {
  return (
    <div className="bg-ot-background min-h-screen flex flex-col">
      <HeaderNoButton />
      <ContentInterest />
      <Footer />
    </div>
  );
}
