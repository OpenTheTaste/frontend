import Image from "next/image";
import { Edit } from "lucide-react";
import { AdminBadge } from "@admin-basecomponent";
import { mockAdminSeries } from "@/mocks/mockAdminSeries";
import { Category } from "@/types/category";
import { cn } from "@/utils/cn";

const CATEGORY_STYLE_MAP: Record<Category, string> = {
  영화: "bg-ot-secondary-600 text-ot-text",
  드라마: "bg-ot-primary-300 text-ot-background",
  예능: "bg-ot-secondary-400 text-ot-text",
  다큐: "bg-ot-secondary-700 text-ot-text",
  뉴스: "bg-ot-gray-800 text-ot-text",
  스포츠: "bg-ot-secondary-500 text-ot-text",
};

const TAG_STYLE_MAP: Record<string, string> = {
  로맨스: "bg-ot-primary-200 text-ot-background",
  사극: "bg-ot-secondary-800 text-ot-text",
  액션: "bg-ot-primary-500 text-ot-text",
  코미디: "bg-ot-secondary-300 text-ot-background",
  호러: "bg-ot-gray-900 text-ot-text",
  SF: "bg-ot-secondary-600 text-ot-text",
  뮤지컬: "bg-ot-primary-100 text-ot-background",
  가족: "bg-ot-secondary-200 text-ot-background",
  의학: "bg-ot-secondary-500 text-ot-text",
  법정: "bg-ot-secondary-700 text-ot-text",
  역사: "bg-ot-secondary-800 text-ot-text",
  스릴러: "bg-ot-primary-700 text-ot-text",
  판타지: "bg-ot-primary-400 text-ot-text",
  리얼리티: "bg-ot-secondary-400 text-ot-text",
  토크쇼: "bg-ot-secondary-300 text-ot-background",
  서바이벌: "bg-ot-primary-600 text-ot-text",
  여행: "bg-ot-secondary-200 text-ot-background",
  연예: "bg-ot-primary-300 text-ot-background",
  과학: "bg-ot-secondary-600 text-ot-text",
  환경: "bg-ot-secondary-500 text-ot-text",
  사회: "bg-ot-gray-700 text-ot-text",
  정치: "bg-ot-gray-800 text-ot-text",
  국제: "bg-ot-secondary-700 text-ot-text",
  축구: "bg-ot-secondary-400 text-ot-text",
  야구: "bg-ot-secondary-500 text-ot-text",
  농구: "bg-ot-primary-500 text-ot-text",
  배구: "bg-ot-secondary-300 text-ot-background",
  골프: "bg-ot-secondary-600 text-ot-text",
  기타: "bg-ot-gray-600 text-ot-text",
};

const badgeBase = "inline-flex items-center justify-center text-xs rounded-[1.25rem] px-3 py-0.5";

export function AdminSeriesContents() {
  const data = mockAdminSeries;

  return (
    <div className="mt-4 rounded-lg overflow-hidden">
      <table className="w-full text-ot-text">
        <colgroup>
          <col className="w-1/9" />
          <col className="w-4/9" />
          <col className="w-1/9" />
          <col className="w-1/9" />
          <col className="w-1/9" />
          <col className="w-1/9" />
        </colgroup>

        <thead className="bg-ot-gray-800 text-md font-bold">
          <tr>
            <th className="py-3">썸네일</th>
            <th>시리즈 제목</th>
            <th>카테고리</th>
            <th>태그</th>
            <th>공개 여부</th>
            <th>수정</th>
          </tr>
        </thead>

        <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
          {data.map((content) => (
            <tr
              key={content.id}
              className="hover:bg-ot-gray-800/30 transition-colors"
            >
              <td className="py-3">
                <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
                  <Image
                    src={content.thumbnail}
                    alt={content.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </td>

              <td className="py-3 text-center">
                <div className="flex flex-col font-semibold">
                  <span>{content.title}</span>
                </div>
              </td>

              <td className="py-3 text-center">
                <span className={cn(badgeBase, CATEGORY_STYLE_MAP[content.category])}>
                  {content.category}
                </span>
              </td>

              <td className="py-3 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(badgeBase, TAG_STYLE_MAP[tag] ?? "bg-ot-gray-600 text-ot-text")}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>

              <td className="py-3 text-center">
                <AdminBadge variant={content.isPublic ? "공개" : "비공개"} />
              </td>

              <td className="py-3 text-center">
                <button>
                  <Edit size={20} className="hover:stroke-ot-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
