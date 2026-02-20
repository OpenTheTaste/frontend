import Header from '@/components/common/Header';
import { ShortsContainer } from '@/components/player/ShortsContainer';
import { ShortsData } from '@/types/shorts';

// 임시 데이터 - 나중에 API로 교체
const shortsList: ShortsData[] = [
  {
    id: '1',
    src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    contentLink: {
      title: '다만 악에서 구하소서 (원본)',
      url: '/contents/1',
      editor: '에디터',
      date: '2026.02.07.',
    },
  },
  // 추가 쇼츠 데이터...
];

export default function ShortsPage() {
  return (
    <div className="min-h-screen bg-ot-background flex flex-col overflow-hidden">
      <Header />
      <ShortsContainer initialData={shortsList} />
    </div>
  );
}