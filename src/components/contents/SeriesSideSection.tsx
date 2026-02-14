import { Episode } from "@/types/contents";
import Link from "next/link";

interface SeriesSideSectionProps {
  episodes: Episode[];
  contentId: number;
}

export default function SeriesSideSection({
  episodes,
  contentId,
}: SeriesSideSectionProps) {
  return (
    <div className="w-full max-w-134 shrink-0">
      <div className="px-5 py-4 rounded-lg flex flex-col h-[80vh] overflow-y-auto">
        <p className="text-2xl font-bold pb-3 border-b">에피소드</p>

        {episodes.map((ep) => (
          <Link key={ep.id} href={`/contents/${contentId}/episode/${ep.id}`}>
            <button
              key={ep.id}
              className="w-full p-4 text-ot-text gap-6 flex items-center hover:bg-ot-gray-900 transition"
            >
              <div className="max-w-25 w-full aspect-4/3 rounded-lg bg-ot-gray-800 shrink-0">
                {/* <img src="/thumb.jpg" className="h-full w-full object-cover" alt="" />  */}
                {/* 썸네일 자리 4:3 */}
                {/* {ep.thumbnail} */}
                시리즈 가로 포스터
              </div>
              <p className="text-xl font-semibold text-left">{ep.title}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
