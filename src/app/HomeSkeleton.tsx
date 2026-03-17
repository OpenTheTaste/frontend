import {
  ContentCarouselSkeleton,
  MainCarouselSkeleton,
} from "@entities/home/components";

const CAROUSEL_CONFIGS = [
  { itemWidth: 180, itemHeight: 240 },
  { itemWidth: 180, itemHeight: 240 },
  { itemWidth: 180, itemHeight: 240 },
  { itemWidth: 240, itemHeight: 180 },
  { itemWidth: 180, itemHeight: 240 },
  { itemWidth: 180, itemHeight: 240 },
  { itemWidth: 180, itemHeight: 240 },
];

export default function HomeSkeleton() {
  return (
    <div>
      <MainCarouselSkeleton />
      {CAROUSEL_CONFIGS.map((config, i) => (
        <ContentCarouselSkeleton key={i} {...config} />
      ))}
    </div>
  );
}
