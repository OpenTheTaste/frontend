import Header from "@/components/common/Header";
import MainCarousel from "@/components/home/MainCarousel";
import ContentCarousel from "@/components/home/ContentCarousel";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <MainCarousel
        title=""
        itemCount={5}
        itemHeight={400}
        itemWidth={1350}
        />
      <ContentCarousel 
        title="실시간 인기 차트"
        itemCount={20}
        itemWidth={180}
        itemHeight={240}
      />
      <ContentCarousel 
        title="00님이 좋아하실 콘텐츠"
        itemCount={20}
        itemWidth={180}
        itemHeight={240}
      />
      <ContentCarousel
        title="카테고리 기반 추천 콘텐츠"
        itemCount={20}
        itemWidth={180}
        itemHeight={240}
      />
      <Footer />
    </div>
  );
}