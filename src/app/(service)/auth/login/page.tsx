import HeaderWithNoButton from "@/components/onboarding/Header/HeaderNoButton";
import LoginContent from "@/components/onboarding/login/LoginContent";
import Footer from "@/components/common/Footer";

export default function Login() {
  return (
    <div className="bg-ot-background min-h-screen">
      <HeaderWithNoButton />
      <LoginContent />
      <Footer />
    </div>
  );
}
