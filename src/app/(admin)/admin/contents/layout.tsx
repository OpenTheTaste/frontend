import { AdminTitle } from "@admin-basecomponent";
import UploadButton from "@/domains/admin/contents/components/UploadButton";

export default function ContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="콘텐츠 관리"
        description="콘텐츠를 관리합니다"
        action={<UploadButton />}
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
