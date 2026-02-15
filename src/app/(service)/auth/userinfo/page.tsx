import Header from "@/components/onboard/Header/Header";
import InterestContent from "@/components/onboard/Interest/interestcontent";
import Footer from "@/components/common/Footer";

export default function InterestPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <InterestContent />
      <Footer />
    </div>
  );
}