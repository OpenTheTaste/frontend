import { Header } from "@layouts";
import { BackButton } from "@base-components";
import { ShortsContainer } from "@entities/shorts/components";
import { ShortsData } from "@shared/types/player/shorts";

const shortsList: ShortsData[] = [
  {
    id: "1",
    src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    contentLink: {
      title: "다만 악에서 구하소서 (원본)",
      url: "/contents/1",
      editor: "에디터",
      date: "2026.02.07.",
    },
  },
];

export default function ShortsPage() {
  return (
    <div className="relative min-h-screen bg-ot-background flex flex-col overflow-hidden">
      <Header />
      <div className="relative flex-1">
        <BackButton />
        <div className="mt-16">
          <ShortsContainer initialData={shortsList} />
        </div>
      </div>
    </div>
  );
}
