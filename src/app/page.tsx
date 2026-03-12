import { Header, Footer } from "@layouts";
import {
  MainCarousel,
  TrendingCarousel,
  RecommendCarousel,
  RecommendTagsSection,
  HistoryCarousel,
  CustomRecommendCarousel
} from "@entities/home/components";

export default function Home() {
  return (
    <div>
      <Header />
      <MainCarousel title="" itemCount={5} itemHeight={400} itemWidth={1350} />
      <CustomRecommendCarousel/>
      <TrendingCarousel />
      <RecommendCarousel />
      <HistoryCarousel/>
      <RecommendTagsSection />
      <Footer />
    </div>
  );
}
