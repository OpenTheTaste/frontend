// import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Upload } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";
import AdminTitle from "@/components/admin/common/AdminTitle";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="콘텐츠 관리"
        description="숏폼 및 콘텐츠를 관리합니다"
        action={
          <CommonButton className="text-ot-text py-3 px-8 font-semibold flex items-center gap-2">
            <Upload size={22} />
            콘텐츠 업로드
          </CommonButton>
        }
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
