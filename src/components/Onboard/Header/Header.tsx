import HeaderBrand from './HeaderBrand';
import HeaderButton from './HedaerButton';

export default function OTHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
      <HeaderBrand />
      <HeaderButton />
    </header>
  );
}