import { Footer } from "@layouts";
import {
  FAQSection,
  MainSection,
  OnboardHeader,
  PosterBackground,
} from "@features/auth/components";

export default function OTPage() {
  return (
    <div className="bg-ot-background relative flex min-h-screen flex-col overflow-hidden">
      <PosterBackground />
      <div
        style={{ position: "relative", zIndex: 1 }}
        className="flex min-h-screen flex-col"
      >
        <OnboardHeader />
        <MainSection />
        <FAQSection />
        <div className="grow" />
        <Footer />
      </div>
    </div>
  );
}
