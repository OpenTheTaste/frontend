import { OnboardHeader, MainSection, FAQSection } from "@features-auth";
import { Footer } from "@layouts";

export default function OTPage() {
  return (
    <div className="bg-ot-background min-h-screen">
      <OnboardHeader />
      <MainSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
