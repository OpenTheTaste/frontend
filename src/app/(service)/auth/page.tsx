import { OnboardHeader, MainSection, FAQSection } from "@onboard";
import { Footer } from "@basecomponent"

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
