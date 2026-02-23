import { HeaderNoButton, LoginContent } from "@onboard";
import { Footer } from "@basecomponent"

export default function Login() {
  return (
    <div className="bg-ot-background min-h-screen">
      <HeaderNoButton />
      <LoginContent />
      <Footer />
    </div>
  );
}
