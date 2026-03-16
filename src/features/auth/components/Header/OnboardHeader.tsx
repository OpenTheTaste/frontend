import { HeaderBrand } from "@features/auth/components";

export default function OnboardHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <HeaderBrand />
    </header>
  );
}
