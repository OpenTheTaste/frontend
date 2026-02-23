import HeaderWithNoButton from "@/domains/onboard/components/Header/HeaderNoButton";
import LoginContent from "@/domains/onboard/components/login/LoginContent";
import { Footer } from "@basecomponent"

export default function Login() {
  return (
    <div className="bg-ot-background min-h-screen">
      <HeaderWithNoButton />
      <LoginContent />
      <Footer />
    </div>
  );
}
