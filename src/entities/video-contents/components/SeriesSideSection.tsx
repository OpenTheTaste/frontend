import Link from "next/link";
import { Episode } from "@shared/types/video-contents/contents";

interface SeriesSideSectionProps {
  episodes: Episode[];
  seriesMediaId: number;
}

export default function SeriesSideSection({
  episodes,
  seriesMediaId,
}: SeriesSideSectionProps) {
  return (
    <div className="w-full max-w-134 shrink-0">
      <div className="flex h-[80vh] flex-col overflow-y-auto rounded-lg px-5 py-4">
        <p className="border-b pb-3 text-2xl font-bold">에피소드</p>

        {episodes.map((ep) => (
          <Link
            key={ep.id}
            href={`/contents/${seriesMediaId}/episode/${ep.id}`}
          >
            <button
              key={ep.id}
              className="text-ot-text hover:bg-ot-gray-900 flex w-full items-center gap-6 p-4 transition"
            >
              <div className="bg-ot-gray-800 aspect-4/3 w-full max-w-25 shrink-0 rounded-lg">
                {/* <img src="/thumb.jpg" className="h-full w-full object-cover" alt="-ui" />  */}
                {/* 썸네일 자리 4:3 */}
                {/* {ep.thumbnail} */}
                시리즈 가로 포스터
              </div>
              <p className="text-left text-xl font-semibold">{ep.title}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
