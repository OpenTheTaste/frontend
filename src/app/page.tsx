import { Suspense } from "react";
import { Footer, Header } from "@layouts";
import {
  CustomRecommendCarousel,
  HistoryCarousel,
  MainCarousel,
  RecommendCarousel,
  RecommendTagsSection,
  TrendingCarousel,
} from "@entities/home/components";
import HomeSkeleton from "./HomeSkeleton";

export default function Home() {
  return (
    <div>
      <Header />
      <Suspense fallback={<HomeSkeleton />}>
        <MainCarousel title="" itemHeight={400} itemWidth={1350} />
        <CustomRecommendCarousel />
        <TrendingCarousel />
        <RecommendCarousel />
        <HistoryCarousel />
        <RecommendTagsSection />
      </Suspense>
      <Footer />
    </div>
  );
}
