import { OnboardHeader, MainSection, FAQSection } from "@features/auth/components";
import { Footer } from "@layouts";

export default function OTPage() {
  return (
    <div className="bg-ot-background min-h-screen flex flex-col">
      <OnboardHeader />
      <MainSection />
      <FAQSection />
      <div className="grow" />
      <Footer />
    </div>
  );
}
