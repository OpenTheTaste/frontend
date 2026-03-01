import HeaderBrand from "@/features/auth/components/Header/HeaderBrand";

export default function HeaderNoButton() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-ot-background">
      <HeaderBrand />
    </header>
  );
}
