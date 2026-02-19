import OnboardHeader from "@/components/onboarding/Header/OnboardHeader";
import MainSection from "@/components/onboarding/Main/MainSection";
import FAQSection from "@/components/onboarding/FAQ/FAQSection";
import Footer from "@/components/common/Footer";

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
