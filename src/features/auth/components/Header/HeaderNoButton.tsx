import { HeaderBrand } from "@features/auth/components";

export default function HeaderNoButton() {
  return (
    <header className="bg-ot-background flex items-center justify-between px-6 py-4">
      <HeaderBrand />
    </header>
  );
}
