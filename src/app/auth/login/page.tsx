import { Footer } from "@layouts";
import { HeaderNoButton, LoginContent } from "@features/auth/components";

export default function Login() {
  return (
    <div className="bg-ot-background flex min-h-screen flex-col">
      <HeaderNoButton />
      <LoginContent />
      <Footer />
    </div>
  );
}
