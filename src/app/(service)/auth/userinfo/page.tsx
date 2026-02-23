import HeaderWithNoButton from "@/components/onboarding/Header/HeaderNoButton";
import InterestContent from "@/components/onboarding/Interest/ContentInterest";
import Footer from "@/components/common/Footer";

export default function InterestPage() {
  return (
    <div className="bg-ot-background min-h-screen flex flex-col">
      <HeaderWithNoButton />
      <InterestContent />
      <Footer />
    </div>
  );
}
