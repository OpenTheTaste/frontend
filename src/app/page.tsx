import { Header, Footer } from "@layouts";
import {
  MainCarousel,
  TrendingCarousel,
  RecommendCarousel,
  RecommendTagsCarousel,
  HistoryCarousel
} from "@entities/home/components";

export default function Home() {
  return (
    <div>
      <Header />
      <MainCarousel title="" itemCount={5} itemHeight={400} itemWidth={1350} />
      <TrendingCarousel />
      <RecommendCarousel />
      <HistoryCarousel/>
      <RecommendTagsCarousel index={0} />
      <RecommendTagsCarousel index={1} />
      <RecommendTagsCarousel index={2} />
      <Footer />
    </div>
  );
}
