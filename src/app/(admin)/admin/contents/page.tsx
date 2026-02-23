import AdminBadge from "@/components/admin/common/AdminBadge";
import { mockAdminContents } from "@/mocks/mockAdminContents";
import { Edit } from "lucide-react";
import Image from "next/image";

export default function AdminContentsPage() {
  const data = mockAdminContents;

  return (
    <>
      <div className="flex gap-4">
        <input
          type="text"
          className="flex-1 bg-ot-gray-800 p-3 border border-ot-gray-700 rounded-lg"
          placeholder="콘텐츠 제목을 입력하세요"
        />

        <div className="w-36 bg-ot-gray-800 p-3 border border-ot-gray-700 rounded-lg">
          드롭다운2
        </div>
      </div>

      <div className="mt-4 rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-1/9" />
            <col className="w-5/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
          </colgroup>

          <thead className="bg-ot-gray-800 text-md font-bold">
            <tr>
              <th className="py-3">썸네일</th>
              <th>제목</th>
              <th>공개 여부</th>
              <th>업로드일</th>
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
                <td className="py-3">
                  <div className="flex flex-col font-semibold">
                    <span>{content.title}</span>
                    <span className="text-sm text-ot-placeholder mt-1">
                      {content.duration}
                    </span>
                  </div>
                </td>

                <td className="py-3 text-center">
                  <AdminBadge
                    variant={content.isPublic ? "공개" : "비공개"}
                    className={
                      content.isPublic
                        ? "bg-[#CCFBF1] text-[#298880]"
                        : "bg-ot-primary-100 text-[#882929]"
                    }
                  />
                </td>
                <td className="py-3 text-center font-semibold text-sm">
                  {content.uploadDate}
                </td>

                <td className="py-3 text-center ">
                  <button>
                    <Edit size={20} className="hover:stroke-ot-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
