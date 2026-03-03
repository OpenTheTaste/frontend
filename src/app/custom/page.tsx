import { Header, Footer } from '@layouts';
import { CustomSetting } from '@features/custom/components'

export default function CustomPage() {
  return (
    <div>
      <Header />
      <CustomSetting />
      <Footer />
    </div>
  );
}
