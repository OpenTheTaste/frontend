import OnboardHeader from "@/components/onboard/Header/OnboardHeader";
import MainSection from "@/components/onboard/Main/MainSection";
import FAQSection from "@/components/onboard/FAQ/FAQSection";
import Footer from "@/components/common/Footer";

export default function OTPage() {
  return (
    <div className="bg-ot-background min-h-screen">
      <OnboardHeader />
      <MainSection />
      <FAQSection />
      <Footer/>
    </div>
  );
}