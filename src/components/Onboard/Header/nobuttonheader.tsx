import HeaderBrand from './HeaderBrand';

export default function NoButtonHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-ot-background">
      <HeaderBrand />
    </header>
  );
}