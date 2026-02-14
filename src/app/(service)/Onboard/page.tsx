import OnboardHeader from "@/components/Onboard/Header/Header";
import OnboardContent from "@/components/Onboard/Main/MainSection";
import FAQSection from "@/components/Onboard/FAQ/FAQSection";
import Footer from "@/components/common/Footer";

export default function OTPage() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <OnboardHeader />
      <OnboardContent />
      <FAQSection />
      <Footer/>
    </div>
  );
}