import { HeaderNoButton, LoginContent } from "@features/auth/components";
import { Footer } from "@layouts";

export default function Login() {
  return (
    <div className="bg-ot-background min-h-screen">
      <HeaderNoButton />
      <LoginContent />
      <Footer />
    </div>
  );
}
