import HeaderBrand from '@/components/onboard/Header/HeaderBrand';
import HeaderButton from '@/components/onboard/Header/HedaerButton';

export default function OnboardHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-ot-background">
      <HeaderBrand />
      <HeaderButton />
    </header>
  );
}