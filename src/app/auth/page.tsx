import { OnboardHeader, MainSection, FAQSection, PosterBackground } from "@features/auth/components";
import { Footer } from "@layouts";

export default function OTPage() {
  return (
    <div className="bg-ot-background min-h-screen flex flex-col relative overflow-hidden">
      <PosterBackground/>
      <div style={{ position: "relative", zIndex: 1 }} className="flex flex-col min-h-screen">
        <OnboardHeader />
        <MainSection />
        <FAQSection />
        <div className="grow" />
        <Footer />
      </div>
    </div>
  );
}
