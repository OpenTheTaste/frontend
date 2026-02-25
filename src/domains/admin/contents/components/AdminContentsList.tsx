"use client";

import { AdminBadge } from "@admin-basecomponent";
import { mockAdminContents } from "@/mocks/mockAdminContents";
import { Edit } from "lucide-react";
import Image from "next/image";
import { PublicType } from "@/types/admin/adminPublic";
import { useRouter, useSearchParams } from "next/navigation";
import { AdminContentsDetailModal } from "./AdminContentsDetailModal";

interface AdminContentsListProps {
  filterPublic?: PublicType | null;
}

export default function AdminContentsList({
  filterPublic,
}: AdminContentsListProps) {
  const data = filterPublic
    ? mockAdminContents.filter((content) =>
        filterPublic === "공개" ? content.isPublic : !content.isPublic,
      )
    : mockAdminContents;

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedId = searchParams.get("id");
  const selectedContents = selectedId
    ? (data.find((s) => s.id === Number(selectedId)) ?? null)
    : null;

  const handleRowClick = (id: number) => {
    router.push(`?id=${id}`, { scroll: false });
  };

  const handleClose = () => {
    router.push("?", { scroll: false });
  };

  return (
    <>
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
                onClick={() => handleRowClick(content.id)}
                className="hover:bg-ot-gray-800/30 transition-colors"
              >
                <td className="py-3">
                  <div className="relative aspect-5/7 max-w-12 w-full mx-auto">
                    <Image
                      src={content.thumbnailVertical || ""}
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
      <AdminContentsDetailModal
        contents={selectedContents}
        onClose={handleClose}
      />
    </>
  );
}
