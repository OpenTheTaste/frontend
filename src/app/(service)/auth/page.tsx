import OnboardHeader from "@/domains/onboard/components/Header/OnboardHeader";
import MainSection from "@/domains/onboard/components/Main/MainSection";
import FAQSection from "@/domains/onboard/components/FAQ/FAQSection";
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
