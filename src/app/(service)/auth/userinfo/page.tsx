import { HeaderNoButton, ContentInterest } from "@onboard";
import { Footer } from "@basecomponent"

export default function InterestPage() {
  return (
    <div className="bg-ot-background min-h-screen flex flex-col">
      <HeaderNoButton />
      <ContentInterest />
      <Footer />
    </div>
  );
}
