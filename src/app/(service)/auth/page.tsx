import OnboardHeader from "@/components/onboard/Header/Header";
import OnboardContent from "@/components/onboard/Main/MainSection";
import FAQSection from "@/components/onboard/FAQ/FAQSection";
import Footer from "@/components/common/Footer";

export default function OTPage() {
  return (
    <div className="bg-background min-h-screen">
      <OnboardHeader />
      <OnboardContent />
      <FAQSection />
      <Footer/>
    </div>
  );
}